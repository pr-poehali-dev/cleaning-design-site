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
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
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
                    SELECT 
                        ca.id, ca.address, ca.client_name, ca.client_phone, ca.service_type, 
                        ca.area, ca.price, ca.scheduled_date, ca.scheduled_time, ca.status, ca.notes, ca.created_at,
                        a.photo_before, a.photo_after, a.photos_uploaded_at,
                        u.full_name as assigned_maid_name,
                        a.salary, a.verified_at, sc.full_name as senior_cleaner_name,
                        a.senior_cleaner_salary, a.inspection_completed_at
                    FROM cleaning_addresses ca
                    LEFT JOIN assignments a ON ca.id = a.address_id
                    LEFT JOIN users u ON a.maid_id = u.id
                    LEFT JOIN users sc ON a.senior_cleaner_id = sc.id
                    ORDER BY ca.scheduled_date DESC, ca.scheduled_time DESC
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
                        'created_at': str(row[11]) if row[11] else None,
                        'photo_before': row[12],
                        'photo_after': row[13],
                        'photos_uploaded_at': str(row[14]) if row[14] else None,
                        'assigned_maid_name': row[15],
                        'salary': float(row[16]) if row[16] else None,
                        'verified_at': str(row[17]) if row[17] else None,
                        'senior_cleaner_name': row[18],
                        'senior_cleaner_salary': float(row[19]) if row[19] else None,
                        'inspection_completed_at': str(row[20]) if row[20] else None
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
            
            elif method == 'PUT':
                params = event.get('queryStringParameters', {})
                address_id = params.get('id')
                
                if not address_id:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'id required'})
                    }
                
                body_data = json.loads(event.get('body', '{}'))
                cur.execute("""
                    UPDATE cleaning_addresses 
                    SET address = %s, client_name = %s, client_phone = %s, 
                        service_type = %s, area = %s, price = %s, 
                        scheduled_date = %s, scheduled_time = %s, notes = %s
                    WHERE id = %s
                """, (
                    body_data.get('address'),
                    body_data.get('client_name'),
                    body_data.get('client_phone'),
                    body_data.get('service_type'),
                    body_data.get('area'),
                    body_data.get('price'),
                    body_data.get('scheduled_date'),
                    body_data.get('scheduled_time'),
                    body_data.get('notes', ''),
                    int(address_id)
                ))
                conn.commit()
                cur.close()
                conn.close()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'message': 'Address updated'})
                }
            
            elif method == 'DELETE':
                params = event.get('queryStringParameters', {})
                address_id = params.get('id')
                
                if not address_id:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'id required'})
                    }
                
                cur.execute("DELETE FROM assignments WHERE address_id = %s", (int(address_id),))
                cur.execute("DELETE FROM cleaning_addresses WHERE id = %s", (int(address_id),))
                conn.commit()
                cur.close()
                conn.close()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'message': 'Address deleted'})
                }
        
        elif action == 'maids':
            if method == 'GET':
                cur.execute("""
                    SELECT 
                        u.id, 
                        u.full_name, 
                        u.email, 
                        u.phone,
                        u.role,
                        COUNT(CASE WHEN ca.status = 'completed' THEN 1 END) as completed_count,
                        COUNT(CASE WHEN ca.status = 'in_progress' THEN 1 END) as in_progress_count,
                        COUNT(CASE WHEN ca.status = 'assigned' THEN 1 END) as assigned_count,
                        COUNT(a.id) as total_assignments
                    FROM users u
                    LEFT JOIN assignments a ON u.id = a.maid_id
                    LEFT JOIN cleaning_addresses ca ON a.address_id = ca.id
                    WHERE u.role IN ('maid', 'senior_cleaner')
                    GROUP BY u.id, u.full_name, u.email, u.phone, u.role
                    ORDER BY u.role, u.full_name
                """)
                rows = cur.fetchall()
                maids = []
                for row in rows:
                    maids.append({
                        'id': row[0],
                        'full_name': row[1],
                        'email': row[2],
                        'phone': row[3],
                        'role': row[4],
                        'completed_count': row[5],
                        'in_progress_count': row[6],
                        'assigned_count': row[7],
                        'total_assignments': row[8]
                    })
                
                cur.close()
                conn.close()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'maids': maids})
                }
            
            elif method == 'PUT':
                body_data = json.loads(event.get('body', '{}'))
                maid_id = body_data.get('id')
                cur.execute("""
                    UPDATE users 
                    SET full_name = %s, email = %s, phone = %s, password_hash = %s
                    WHERE id = %s AND role IN ('maid', 'senior_cleaner')
                """, (
                    body_data.get('full_name'),
                    body_data.get('email'),
                    body_data.get('phone'),
                    body_data.get('password'),
                    maid_id
                ))
                conn.commit()
                cur.close()
                conn.close()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'message': 'Maid updated'})
                }
            
            elif method == 'DELETE':
                body_data = json.loads(event.get('body', '{}'))
                maid_id = body_data.get('id')
                
                cur.execute("DELETE FROM assignments WHERE maid_id = %s", (maid_id,))
                cur.execute("DELETE FROM users WHERE id = %s AND role IN ('maid', 'senior_cleaner')", (maid_id,))
                conn.commit()
                cur.close()
                conn.close()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'message': 'Maid deleted'})
                }
            
            elif method == 'POST':
                body_data = json.loads(event.get('body', '{}'))
                role = body_data.get('role', 'maid')
                cur.execute("""
                    INSERT INTO users (email, password_hash, full_name, phone, role)
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING id
                """, (
                    body_data.get('email'),
                    body_data.get('password'),
                    body_data.get('full_name'),
                    body_data.get('phone'),
                    role
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
            senior_cleaner_id = body_data.get('senior_cleaner_id')
            salary = body_data.get('salary', 5000)
            senior_cleaner_salary = body_data.get('senior_cleaner_salary', 2000)
            
            cur.execute("""
                INSERT INTO assignments (address_id, maid_id, senior_cleaner_id, salary, senior_cleaner_salary, status)
                VALUES (%s, %s, %s, %s, %s, 'assigned')
                ON CONFLICT (address_id, maid_id) DO UPDATE 
                SET salary = EXCLUDED.salary, senior_cleaner_id = EXCLUDED.senior_cleaner_id, senior_cleaner_salary = EXCLUDED.senior_cleaner_salary
                RETURNING id
            """, (address_id, maid_id, senior_cleaner_id, salary, senior_cleaner_salary))
            
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
        
        elif action == 'verify' and method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            address_id = body_data.get('address_id')
            admin_id = body_data.get('admin_id')
            
            cur.execute("""
                UPDATE assignments 
                SET verified_at = NOW(), verified_by = %s
                WHERE address_id = %s AND status = 'completed'
                RETURNING id
            """, (admin_id, address_id))
            
            result = cur.fetchone()
            if result:
                conn.commit()
            
            cur.close()
            conn.close()
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'message': 'Verified and salary assigned'})
            }
        
        elif action == 'cancel-assignment' and method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            address_id = body_data.get('address_id')
            
            if not address_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'address_id required'})
                }
            
            cur.execute("""
                UPDATE cleaning_addresses 
                SET status = 'cancelled' 
                WHERE id = %s
            """, (address_id,))
            
            cur.execute("""
                UPDATE assignments 
                SET status = 'cancelled' 
                WHERE address_id = %s
            """, (address_id,))
            
            conn.commit()
            cur.close()
            conn.close()
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'message': 'Assignment cancelled'})
            }
        
        elif action == 'mark-paid' and method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            assignment_id = body_data.get('assignment_id')
            
            if not assignment_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'assignment_id required'})
                }
            
            cur.execute("""
                UPDATE assignments 
                SET paid = TRUE
                WHERE id = %s
            """, (int(assignment_id),))
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'message': 'Payment marked'})
            }
        
        elif action == 'salary-stats' and method == 'GET':
            # Статистика для горничных
            cur.execute("""
                SELECT 
                    u.id as maid_id,
                    u.full_name as maid_name,
                    u.role,
                    COALESCE(SUM(a.salary), 0) as total_earned,
                    COUNT(CASE WHEN a.verified_at IS NOT NULL THEN 1 END) as completed_count,
                    COALESCE(SUM(CASE 
                        WHEN EXTRACT(MONTH FROM a.verified_at) = EXTRACT(MONTH FROM CURRENT_DATE)
                        AND EXTRACT(YEAR FROM a.verified_at) = EXTRACT(YEAR FROM CURRENT_DATE)
                        THEN a.salary ELSE 0 END), 0) as current_month_earned,
                    COUNT(CASE 
                        WHEN EXTRACT(MONTH FROM a.verified_at) = EXTRACT(MONTH FROM CURRENT_DATE)
                        AND EXTRACT(YEAR FROM a.verified_at) = EXTRACT(YEAR FROM CURRENT_DATE)
                        THEN 1 END) as current_month_count
                FROM users u
                LEFT JOIN assignments a ON u.id = a.maid_id
                WHERE u.role = 'maid'
                GROUP BY u.id, u.full_name, u.role
            """)
            
            maid_stats = cur.fetchall()
            
            # Статистика для старших клинеров
            cur.execute("""
                SELECT 
                    u.id as senior_id,
                    u.full_name as senior_name,
                    u.role,
                    COALESCE(SUM(a.senior_cleaner_salary), 0) as total_earned,
                    COUNT(CASE WHEN a.inspection_completed_at IS NOT NULL THEN 1 END) as completed_count,
                    COALESCE(SUM(CASE 
                        WHEN EXTRACT(MONTH FROM a.inspection_completed_at) = EXTRACT(MONTH FROM CURRENT_DATE)
                        AND EXTRACT(YEAR FROM a.inspection_completed_at) = EXTRACT(YEAR FROM CURRENT_DATE)
                        THEN a.senior_cleaner_salary ELSE 0 END), 0) as current_month_earned,
                    COUNT(CASE 
                        WHEN EXTRACT(MONTH FROM a.inspection_completed_at) = EXTRACT(MONTH FROM CURRENT_DATE)
                        AND EXTRACT(YEAR FROM a.inspection_completed_at) = EXTRACT(YEAR FROM CURRENT_DATE)
                        THEN 1 END) as current_month_count
                FROM users u
                LEFT JOIN assignments a ON u.id = a.senior_cleaner_id
                WHERE u.role = 'senior_cleaner'
                GROUP BY u.id, u.full_name, u.role
            """)
            
            senior_stats = cur.fetchall()
            
            stats = []
            total_paid = 0
            
            # Обрабатываем статистику горничных
            for row in maid_stats:
                total_earned = float(row[3]) if row[3] else 0
                current_month_earned = float(row[5]) if row[5] else 0
                total_paid += total_earned
                
                stats.append({
                    'maid_id': row[0],
                    'maid_name': row[1],
                    'role': row[2],
                    'total_earned': total_earned,
                    'completed_count': row[4],
                    'current_month_earned': current_month_earned,
                    'current_month_count': row[6]
                })
            
            # Обрабатываем статистику старших клинеров
            for row in senior_stats:
                total_earned = float(row[3]) if row[3] else 0
                current_month_earned = float(row[5]) if row[5] else 0
                total_paid += total_earned
                
                stats.append({
                    'maid_id': row[0],
                    'maid_name': row[1],
                    'role': row[2],
                    'total_earned': total_earned,
                    'completed_count': row[4],
                    'current_month_earned': current_month_earned,
                    'current_month_count': row[6]
                })
            
            # Сортируем по общему заработку
            stats.sort(key=lambda x: x['total_earned'], reverse=True)
            
            cur.close()
            conn.close()
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'stats': stats, 'total_paid': total_paid})
            }
        
        elif action == 'payments' and method == 'GET':
            paid_filter = params.get('paid')
            
            query = """
                SELECT 
                    a.id,
                    ca.address,
                    ca.client_name,
                    ca.scheduled_date,
                    u.full_name as maid_name,
                    u.role as maid_role,
                    a.salary,
                    a.verified_at,
                    a.inspection_completed_at,
                    a.paid,
                    ca.service_type,
                    ca.area,
                    sc.full_name as senior_cleaner_name,
                    a.senior_cleaner_salary
                FROM assignments a
                JOIN cleaning_addresses ca ON a.address_id = ca.id
                JOIN users u ON a.maid_id = u.id
                LEFT JOIN users sc ON a.senior_cleaner_id = sc.id
                WHERE a.verified_at IS NOT NULL OR a.inspection_completed_at IS NOT NULL
            """
            
            if paid_filter == 'true':
                query += " AND a.paid = TRUE"
            elif paid_filter == 'false':
                query += " AND a.paid = FALSE"
            
            query += " ORDER BY COALESCE(a.verified_at, a.inspection_completed_at) DESC"
            
            cur.execute(query)
            rows = cur.fetchall()
            
            payments = []
            for row in rows:
                payments.append({
                    'id': row[0],
                    'address': row[1],
                    'client_name': row[2],
                    'scheduled_date': str(row[3]),
                    'maid_name': row[4],
                    'maid_role': row[5],
                    'salary': float(row[6]) if row[6] else 0,
                    'verified_at': str(row[7]) if row[7] else None,
                    'inspection_completed_at': str(row[8]) if row[8] else None,
                    'paid': row[9],
                    'service_type': row[10],
                    'area': row[11],
                    'senior_cleaner_name': row[12],
                    'senior_cleaner_salary': float(row[13]) if row[13] else 0
                })
            
            cur.close()
            conn.close()
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'payments': payments})
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