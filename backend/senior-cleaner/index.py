'''
Business: API для старшего клинера (просмотр заданий на проверку, чек-лист проверки)
Args: event - dict с httpMethod, body, queryStringParameters
      context - объект с атрибутами request_id, function_name
Returns: HTTP response с заданиями на проверку или результатом операции
'''
import json
import os
import psycopg2
from typing import Dict, Any, List

def get_inspection_checklist_for_service_type(service_type: str) -> List[Dict[str, Any]]:
    """Генерирует чек-лист проверки для типа уборки"""
    base_items = [
        {'id': 'i1', 'text': 'Качество уборки пыли с поверхностей', 'category': 'Общая проверка', 'checked': False},
        {'id': 'i2', 'text': 'Чистота полов (без разводов и пятен)', 'category': 'Общая проверка', 'checked': False},
        {'id': 'i3', 'text': 'Зеркала без разводов', 'category': 'Общая проверка', 'checked': False},
        {'id': 'i4', 'text': 'Отсутствие пыли на батареях и подоконниках', 'category': 'Общая проверка', 'checked': False},
        {'id': 'i5', 'text': 'Чистота дверных ручек и выключателей', 'category': 'Общая проверка', 'checked': False},
        {'id': 'i6', 'text': 'Мусор вынесен', 'category': 'Общая проверка', 'checked': False},
        
        {'id': 'i7', 'text': 'Раковина без налета и пятен', 'category': 'Кухня', 'checked': False},
        {'id': 'i8', 'text': 'Плита и столешницы идеально чистые', 'category': 'Кухня', 'checked': False},
        {'id': 'i9', 'text': 'Холодильник снаружи без отпечатков', 'category': 'Кухня', 'checked': False},
        {'id': 'i10', 'text': 'Микроволновка чистая внутри и снаружи', 'category': 'Кухня', 'checked': False},
        {'id': 'i11', 'text': 'Смесители блестят', 'category': 'Кухня', 'checked': False},
        
        {'id': 'i12', 'text': 'Унитаз идеально чистый', 'category': 'Ванная', 'checked': False},
        {'id': 'i13', 'text': 'Раковина без известкового налета', 'category': 'Ванная', 'checked': False},
        {'id': 'i14', 'text': 'Ванна/душ без мыльных разводов', 'category': 'Ванная', 'checked': False},
        {'id': 'i15', 'text': 'Плитка чистая, швы без грязи', 'category': 'Ванная', 'checked': False},
        {'id': 'i16', 'text': 'Зеркала без разводов и капель', 'category': 'Ванная', 'checked': False},
        {'id': 'i17', 'text': 'Смесители блестящие', 'category': 'Ванная', 'checked': False},
    ]
    
    deep_items = [
        {'id': 'i18', 'text': 'Плинтусы чистые по всей длине', 'category': 'Детальная проверка', 'checked': False},
        {'id': 'i19', 'text': 'Двери протерты с обеих сторон', 'category': 'Детальная проверка', 'checked': False},
        {'id': 'i20', 'text': 'Батареи чистые между секциями', 'category': 'Детальная проверка', 'checked': False},
        {'id': 'i21', 'text': 'Люстры и светильники без пыли', 'category': 'Детальная проверка', 'checked': False},
        {'id': 'i22', 'text': 'Холодильник чист внутри', 'category': 'Детальная проверка', 'checked': False},
        {'id': 'i23', 'text': 'Духовка чистая внутри', 'category': 'Детальная проверка', 'checked': False},
        {'id': 'i24', 'text': 'Вытяжка чистая', 'category': 'Детальная проверка', 'checked': False},
        {'id': 'i25', 'text': 'Кухонные шкафы протерты снаружи', 'category': 'Детальная проверка', 'checked': False},
        {'id': 'i26', 'text': 'Швы между плиткой чистые', 'category': 'Детальная проверка', 'checked': False},
        {'id': 'i27', 'text': 'Сантехника отполирована', 'category': 'Детальная проверка', 'checked': False},
        {'id': 'i28', 'text': 'Окна чистые (если входит в услугу)', 'category': 'Детальная проверка', 'checked': False},
    ]
    
    after_items = [
        {'id': 'i29', 'text': 'Отсутствие строительной пыли', 'category': 'После ремонта', 'checked': False},
        {'id': 'i30', 'text': 'Следы от ремонта удалены', 'category': 'После ремонта', 'checked': False},
        {'id': 'i31', 'text': 'Окна очищены от защитной пленки', 'category': 'После ремонта', 'checked': False},
    ]
    
    office_items = [
        {'id': 'i32', 'text': 'Рабочие столы протерты', 'category': 'Офис', 'checked': False},
        {'id': 'i33', 'text': 'Оргтехника чистая', 'category': 'Офис', 'checked': False},
        {'id': 'i34', 'text': 'Переговорная убрана', 'category': 'Офис', 'checked': False},
        {'id': 'i35', 'text': 'Кухонная зона чистая', 'category': 'Офис', 'checked': False},
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
    action = params.get('action', 'inspections') if params else 'inspections'
    
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
        
        if action == 'inspections' and method == 'GET':
            params = event.get('queryStringParameters', {})
            senior_cleaner_id = params.get('senior_cleaner_id')
            
            if not senior_cleaner_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'senior_cleaner_id required'})
                }
            
            cur.execute("""
                SELECT a.id, ca.address, ca.client_name, ca.client_phone, 
                       ca.service_type, ca.area, ca.price, ca.scheduled_date, 
                       ca.scheduled_time, ca.status, ca.notes,
                       a.photo_before, a.photo_after, a.photos_uploaded_at,
                       a.senior_cleaner_salary, a.inspection_checklist_data, 
                       a.inspection_started_at, a.inspection_completed_at,
                       u.full_name as maid_name
                FROM assignments a
                JOIN cleaning_addresses ca ON a.address_id = ca.id
                LEFT JOIN users u ON a.maid_id = u.id
                WHERE a.senior_cleaner_id = %s
                ORDER BY ca.scheduled_date DESC, ca.scheduled_time DESC
            """, (int(senior_cleaner_id),))
            
            rows = cur.fetchall()
            inspections = []
            for row in rows:
                inspections.append({
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
                    'photo_before': row[11],
                    'photo_after': row[12],
                    'photos_uploaded_at': str(row[13]) if row[13] else None,
                    'senior_cleaner_salary': float(row[14]) if row[14] else None,
                    'inspection_checklist_data': row[15],
                    'inspection_started_at': str(row[16]) if row[16] else None,
                    'inspection_completed_at': str(row[17]) if row[17] else None,
                    'maid_name': row[18]
                })
            
            cur.close()
            conn.close()
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'inspections': inspections})
            }
        
        elif action == 'start-inspection' and method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            assignment_id = body_data.get('assignment_id')
            
            if not assignment_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'assignment_id required'})
                }
            
            cur.execute("""
                SELECT ca.service_type FROM assignments a
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
            
            service_type = result[0]
            inspection_checklist = get_inspection_checklist_for_service_type(service_type)
            
            cur.execute("""
                UPDATE assignments 
                SET inspection_checklist_data = %s, inspection_started_at = CURRENT_TIMESTAMP
                WHERE id = %s
            """, (json.dumps(inspection_checklist), int(assignment_id)))
            
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'message': 'Inspection started'})
            }
        
        elif action == 'update-inspection-checklist' and method == 'POST':
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
                SET inspection_checklist_data = %s
                WHERE id = %s
            """, (json.dumps(checklist_data), int(assignment_id)))
            
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'message': 'Inspection checklist updated'})
            }
        
        elif action == 'complete-inspection' and method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            assignment_id = body_data.get('assignment_id')
            
            if not assignment_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'assignment_id required'})
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
            
            # Обновляем статус проверки и адреса
            cur.execute("""
                UPDATE assignments 
                SET inspection_completed_at = CURRENT_TIMESTAMP, verified_at = CURRENT_TIMESTAMP
                WHERE id = %s
            """, (int(assignment_id),))
            
            cur.execute("""
                UPDATE cleaning_addresses 
                SET status = 'verified' 
                WHERE id = %s
            """, (address_id,))
            
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'message': 'Inspection completed, verified, and salaries assigned'})
            }
        
        elif action == 'salary-history' and method == 'GET':
            params = event.get('queryStringParameters', {})
            senior_cleaner_id = params.get('senior_cleaner_id')
            
            if not senior_cleaner_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'senior_cleaner_id required'})
                }
            
            cur.execute("""
                SELECT 
                    a.id,
                    ca.address,
                    ca.client_name,
                    ca.scheduled_date,
                    a.inspection_started_at,
                    a.inspection_completed_at,
                    a.senior_cleaner_salary,
                    ca.service_type,
                    ca.area
                FROM assignments a
                JOIN cleaning_addresses ca ON a.address_id = ca.id
                WHERE a.senior_cleaner_id = %s AND a.inspection_completed_at IS NOT NULL
                ORDER BY a.inspection_completed_at DESC
            """, (int(senior_cleaner_id),))
            
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
                    'inspection_started_at': str(row[4]) if row[4] else None,
                    'inspection_completed_at': str(row[5]) if row[5] else None,
                    'salary': salary,
                    'service_type': row[7],
                    'area': row[8]
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
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Invalid action or method'})
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }