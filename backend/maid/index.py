'''
Business: API для горничной (просмотр заданий, обновление статуса)
Args: event - dict с httpMethod, body, queryStringParameters
      context - объект с атрибутами request_id, function_name
Returns: HTTP response с заданиями или результатом операции
'''
import json
import os
import psycopg2
from typing import Dict, Any, List

def get_checklist_for_service_type(service_type: str) -> List[Dict[str, Any]]:
    """Генерирует чек-лист для типа уборки"""
    base_items = [
        {'id': '1', 'text': 'Протереть пыль с мебели', 'category': 'Общие зоны', 'checked': False},
        {'id': '2', 'text': 'Пропылесосить полы', 'category': 'Общие зоны', 'checked': False},
        {'id': '3', 'text': 'Вымыть полы', 'category': 'Общие зоны', 'checked': False},
        {'id': '4', 'text': 'Протереть зеркала', 'category': 'Общие зоны', 'checked': False},
        {'id': '5', 'text': 'Протереть дверные ручки', 'category': 'Общие зоны', 'checked': False},
        {'id': '6', 'text': 'Протереть выключатели', 'category': 'Общие зоны', 'checked': False},
        {'id': '7', 'text': 'Вынести мусор', 'category': 'Общие зоны', 'checked': False},
        {'id': '13', 'text': 'Вымыть раковину', 'category': 'Кухня', 'checked': False},
        {'id': '14', 'text': 'Очистить плиту', 'category': 'Кухня', 'checked': False},
        {'id': '15', 'text': 'Протереть столешницы', 'category': 'Кухня', 'checked': False},
        {'id': '16', 'text': 'Вымыть холодильник снаружи', 'category': 'Кухня', 'checked': False},
        {'id': '17', 'text': 'Очистить микроволновку', 'category': 'Кухня', 'checked': False},
        {'id': '18', 'text': 'Протереть смесители', 'category': 'Кухня', 'checked': False},
        {'id': '24', 'text': 'Вымыть унитаз', 'category': 'Ванная', 'checked': False},
        {'id': '25', 'text': 'Очистить раковину', 'category': 'Ванная', 'checked': False},
        {'id': '26', 'text': 'Вымыть ванну/душевую', 'category': 'Ванная', 'checked': False},
        {'id': '27', 'text': 'Протереть зеркало', 'category': 'Ванная', 'checked': False},
        {'id': '28', 'text': 'Вымыть плитку', 'category': 'Ванная', 'checked': False},
        {'id': '29', 'text': 'Протереть смесители', 'category': 'Ванная', 'checked': False},
        {'id': '33', 'text': 'Протереть подоконники', 'category': 'Спальня', 'checked': False},
        {'id': '34', 'text': 'Пропылесосить под кроватью', 'category': 'Спальня', 'checked': False},
        {'id': '35', 'text': 'Протереть пыль со всех поверхностей', 'category': 'Спальня', 'checked': False},
    ]
    
    deep_items = [
        {'id': '8', 'text': 'Помыть плинтусы', 'category': 'Общие зоны', 'checked': False},
        {'id': '9', 'text': 'Протереть двери', 'category': 'Общие зоны', 'checked': False},
        {'id': '10', 'text': 'Протереть батареи', 'category': 'Общие зоны', 'checked': False},
        {'id': '11', 'text': 'Помыть люстры и светильники', 'category': 'Общие зоны', 'checked': False},
        {'id': '19', 'text': 'Помыть холодильник внутри', 'category': 'Кухня', 'checked': False},
        {'id': '20', 'text': 'Помыть духовку внутри', 'category': 'Кухня', 'checked': False},
        {'id': '21', 'text': 'Помыть вытяжку', 'category': 'Кухня', 'checked': False},
        {'id': '22', 'text': 'Помыть кухонные шкафы снаружи', 'category': 'Кухня', 'checked': False},
        {'id': '30', 'text': 'Очистить швы между плиткой', 'category': 'Ванная', 'checked': False},
        {'id': '31', 'text': 'Отполировать сантехнику', 'category': 'Ванная', 'checked': False},
        {'id': '32', 'text': 'Помыть полотенцесушитель', 'category': 'Ванная', 'checked': False},
        {'id': '36', 'text': 'Протереть шкафы снаружи', 'category': 'Спальня', 'checked': False},
        {'id': '37', 'text': 'Пропылесосить мебель', 'category': 'Спальня', 'checked': False},
        {'id': '38', 'text': 'Помыть окна', 'category': 'Окна', 'checked': False},
        {'id': '39', 'text': 'Помыть рамы и подоконники', 'category': 'Окна', 'checked': False},
    ]
    
    after_items = [
        {'id': '12', 'text': 'Удалить строительную пыль', 'category': 'Общие зоны', 'checked': False},
        {'id': '23', 'text': 'Очистить следы от ремонта', 'category': 'Кухня', 'checked': False},
    ]
    
    office_items = [
        {'id': '40', 'text': 'Протереть рабочие столы', 'category': 'Офис', 'checked': False},
        {'id': '41', 'text': 'Протереть оргтехнику', 'category': 'Офис', 'checked': False},
        {'id': '42', 'text': 'Убрать переговорную', 'category': 'Офис', 'checked': False},
        {'id': '43', 'text': 'Помыть кухонную зону', 'category': 'Офис', 'checked': False},
    ]
    
    if service_type == 'basic':
        return base_items
    elif service_type == 'deep':
        return base_items + deep_items
    elif service_type == 'after':
        return base_items + deep_items + after_items
    elif service_type == 'office':
        return base_items + office_items
    else:
        return base_items

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
                       a.photo_before, a.photo_after, a.photos_uploaded_at,
                       a.salary, a.verified_at, a.checklist_data, a.checklist_started_at
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
                    'photos_uploaded_at': str(row[14]) if row[14] else None,
                    'salary': float(row[15]) if row[15] else None,
                    'verified_at': str(row[16]) if row[16] else None,
                    'checklist_data': row[17],
                    'checklist_started_at': str(row[18]) if row[18] else None
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
                SELECT address_id, ca.service_type FROM assignments a
                JOIN cleaning_addresses ca ON a.address_id = ca.id
                WHERE a.id = %s
            """, (int(assignment_id),))
            
            result = cur.fetchone()
            if not result:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Assignment not found'})
                }
            
            address_id = result[0]
            service_type = result[1]
            
            # Если статус меняется на in_progress, создаем чек-лист
            if status == 'in_progress':
                checklist_items = get_checklist_for_service_type(service_type)
                cur.execute("""
                    UPDATE assignments 
                    SET status = %s, checklist_data = %s, checklist_started_at = CURRENT_TIMESTAMP
                    WHERE id = %s
                """, (status, json.dumps(checklist_items), int(assignment_id)))
            else:
                cur.execute("""
                    UPDATE assignments 
                    SET status = %s
                    WHERE id = %s
                """, (status, int(assignment_id)))
            
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
        
        elif action == 'update-checklist' and method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            assignment_id = body_data.get('assignment_id')
            checklist_data = body_data.get('checklist_data')
            
            if not assignment_id or not checklist_data:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'assignment_id and checklist_data required'})
                }
            
            cur.execute("""
                UPDATE assignments 
                SET checklist_data = %s
                WHERE id = %s
            """, (json.dumps(checklist_data), int(assignment_id)))
            
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'message': 'Checklist updated'})
            }
        
        elif action == 'salary-history' and method == 'GET':
            params = event.get('queryStringParameters', {})
            maid_id = params.get('maid_id')
            
            if not maid_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'maid_id required'})
                }
            
            cur.execute("""
                SELECT 
                    a.id,
                    ca.address,
                    ca.client_name,
                    ca.scheduled_date,
                    a.completed_at,
                    a.verified_at,
                    a.salary,
                    ca.service_type,
                    ca.area,
                    a.paid
                FROM assignments a
                JOIN cleaning_addresses ca ON a.address_id = ca.id
                WHERE a.maid_id = %s AND a.verified_at IS NOT NULL
                ORDER BY a.verified_at DESC
            """, (int(maid_id),))
            
            rows = cur.fetchall()
            records = []
            total_earned = 0
            
            for row in rows:
                salary = float(row[6]) if row[6] else 0
                total_earned += salary
                records.append({
                    'id': row[0],
                    'address': row[1],
                    'client_name': row[2],
                    'scheduled_date': str(row[3]),
                    'completed_at': str(row[4]) if row[4] else None,
                    'verified_at': str(row[5]) if row[5] else None,
                    'salary': salary,
                    'service_type': row[7],
                    'area': row[8],
                    'paid': row[9] if row[9] else False
                })
            
            cur.close()
            conn.close()
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'records': records, 'total_earned': total_earned})
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