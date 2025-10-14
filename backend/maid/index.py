'''
Business: API для горничной (просмотр заданий, обновление статуса)
Args: event - dict с httpMethod, body, queryStringParameters
      context - объект с атрибутами request_id, function_name
Returns: HTTP response с заданиями или результатом операции
'''
import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    params = event.get('queryStringParameters', {})
    action = params.get('action', 'assignments') if params else 'assignments'
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Database connection error'})
        }
    
    try:
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()
        
        if action == 'assignments' and method == 'GET':
            params = event.get('queryStringParameters', {})
            maid_id = params.get('maid_id')
            
            if not maid_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'maid_id required'})
                }
            
            cur.execute("""
                SELECT a.id, ca.address, ca.client_name, ca.client_phone, 
                       ca.service_type, ca.area, ca.price, ca.scheduled_date, 
                       ca.scheduled_time, ca.status, ca.notes, a.assigned_at,
                       a.photo_before, a.photo_after, a.photos_uploaded_at
                FROM assignments a
                JOIN cleaning_addresses ca ON a.address_id = ca.id
                WHERE a.maid_id = %s
                ORDER BY ca.scheduled_date DESC, ca.scheduled_time DESC
            """, (int(maid_id),))
            
            rows = cur.fetchall()
            assignments = []
            for row in rows:
                assignments.append({
                    'id': row[0],
                    'address': row[1],
                    'client_name': row[2],
                    'client_phone': row[3],
                    'service_type': row[4],
                    'area': row[5],
                    'price': float(row[6]),
                    'scheduled_date': str(row[7]),
                    'scheduled_time': str(row[8]),
                    'status': row[9],
                    'notes': row[10],
                    'assigned_at': str(row[11]) if row[11] else None,
                    'photo_before': row[12],
                    'photo_after': row[13],
                    'photos_uploaded_at': str(row[14]) if row[14] else None
                })
            
            cur.close()
            conn.close()
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'assignments': assignments})
            }
        
        elif action == 'upload-photos' and method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            assignment_id = body_data.get('assignment_id')
            photo_before = body_data.get('photo_before')
            photo_after = body_data.get('photo_after')
            
            if not assignment_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'assignment_id required'})
                }
            
            update_parts = []
            params = []
            
            if photo_before:
                update_parts.append('photo_before = %s')
                params.append(photo_before)
            
            if photo_after:
                update_parts.append('photo_after = %s')
                params.append(photo_after)
            
            if update_parts:
                update_parts.append('photos_uploaded_at = CURRENT_TIMESTAMP')
                params.append(int(assignment_id))
                
                cur.execute(f"""
                    UPDATE assignments 
                    SET {', '.join(update_parts)}
                    WHERE id = %s
                """, tuple(params))
                
                conn.commit()
            
            cur.close()
            conn.close()
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'message': 'Photos uploaded'})
            }
        
        elif action == 'update-status' and method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            assignment_id = body_data.get('assignment_id')
            status = body_data.get('status')
            
            if not assignment_id or not status:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'assignment_id and status required'})
                }
            
            cur.execute("""
                SELECT address_id FROM assignments WHERE id = %s
            """, (int(assignment_id),))
            
            result = cur.fetchone()
            if not result:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Assignment not found'})
                }
            
            address_id = result[0]
            
            cur.execute("""
                UPDATE cleaning_addresses 
                SET status = %s 
                WHERE id = %s
            """, (status, address_id))
            
            if status == 'completed':
                cur.execute("""
                    UPDATE assignments 
                    SET completed_at = CURRENT_TIMESTAMP 
                    WHERE id = %s
                """, (int(assignment_id),))
            
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'message': 'Status updated'})
            }
        
        cur.close()
        conn.close()
        return {
            'statusCode': 404,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Not found'})
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Server error: {str(e)}'})
        }