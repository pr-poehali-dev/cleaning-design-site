'''
Business: API для администратора (управление адресами, горничными, назначениями)
Args: event - dict с httpMethod, body, queryStringParameters
      context - объект с атрибутами request_id, function_name
Returns: HTTP response с данными или результатом операции
'''
import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    params = event.get('queryStringParameters', {})
    action = params.get('action', 'addresses') if params else 'addresses'
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
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
        
        if action == 'addresses':
            if method == 'GET':
                cur.execute("""
                    SELECT id, address, client_name, client_phone, service_type, 
                           area, price, scheduled_date, scheduled_time, status, notes, created_at
                    FROM cleaning_addresses 
                    ORDER BY scheduled_date DESC, scheduled_time DESC
                """)
                rows = cur.fetchall()
                addresses = []
                for row in rows:
                    addresses.append({
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
                        'created_at': str(row[11]) if row[11] else None
                    })
                
                cur.close()
                conn.close()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'addresses': addresses})
                }
            
            elif method == 'POST':
                body_data = json.loads(event.get('body', '{}'))
                cur.execute("""
                    INSERT INTO cleaning_addresses 
                    (address, client_name, client_phone, service_type, area, price, 
                     scheduled_date, scheduled_time, notes)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id
                """, (
                    body_data.get('address'),
                    body_data.get('client_name'),
                    body_data.get('client_phone'),
                    body_data.get('service_type'),
                    body_data.get('area'),
                    body_data.get('price'),
                    body_data.get('scheduled_date'),
                    body_data.get('scheduled_time'),
                    body_data.get('notes', '')
                ))
                new_id = cur.fetchone()[0]
                conn.commit()
                cur.close()
                conn.close()
                return {
                    'statusCode': 201,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'id': new_id, 'message': 'Address created'})
                }
        
        elif action == 'maids':
            if method == 'GET':
                cur.execute("""
                    SELECT id, full_name, email, phone 
                    FROM users 
                    WHERE role = 'maid'
                    ORDER BY full_name
                """)
                rows = cur.fetchall()
                maids = []
                for row in rows:
                    maids.append({
                        'id': row[0],
                        'full_name': row[1],
                        'email': row[2],
                        'phone': row[3]
                    })
                
                cur.close()
                conn.close()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'maids': maids})
                }
            
            elif method == 'POST':
                body_data = json.loads(event.get('body', '{}'))
                cur.execute("""
                    INSERT INTO users (email, password_hash, full_name, phone, role)
                    VALUES (%s, %s, %s, %s, 'maid')
                    RETURNING id
                """, (
                    body_data.get('email'),
                    body_data.get('password'),
                    body_data.get('full_name'),
                    body_data.get('phone')
                ))
                new_id = cur.fetchone()[0]
                conn.commit()
                cur.close()
                conn.close()
                return {
                    'statusCode': 201,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'id': new_id, 'message': 'Maid created'})
                }
        
        elif action == 'assign' and method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            address_id = body_data.get('address_id')
            maid_id = body_data.get('maid_id')
            
            cur.execute("""
                INSERT INTO assignments (address_id, maid_id)
                VALUES (%s, %s)
                ON CONFLICT (address_id, maid_id) DO NOTHING
                RETURNING id
            """, (address_id, maid_id))
            
            result = cur.fetchone()
            if result:
                cur.execute("""
                    UPDATE cleaning_addresses 
                    SET status = 'assigned' 
                    WHERE id = %s
                """, (address_id,))
                conn.commit()
            
            cur.close()
            conn.close()
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'message': 'Assignment created'})
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