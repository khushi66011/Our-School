"""
Our School - Flask Backend
Run: python app.py
API will start at http://localhost:5000
"""

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import sqlite3
import json
import os
import random
import string
from datetime import datetime, timedelta

app = Flask(__name__, static_folder='../frontend')
CORS(app)

DB_PATH = 'ourschool.db'

# ===== DATABASE SETUP =====
def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    db = get_db()
    cursor = db.cursor()

    cursor.executescript("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            phone TEXT UNIQUE NOT NULL,
            name TEXT,
            language TEXT DEFAULT 'en',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS otps (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            phone TEXT NOT NULL,
            otp TEXT NOT NULL,
            expires_at TIMESTAMP,
            used INTEGER DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS modules (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT,
            subjects TEXT
        );

        CREATE TABLE IF NOT EXISTS subjects (
            id TEXT PRIMARY KEY,
            module_id TEXT,
            name TEXT NOT NULL,
            icon TEXT,
            FOREIGN KEY (module_id) REFERENCES modules(id)
        );

        CREATE TABLE IF NOT EXISTS chapters (
            id TEXT PRIMARY KEY,
            subject_id TEXT,
            module_id TEXT,
            number INTEGER,
            name TEXT NOT NULL,
            video_url TEXT,
            video_label TEXT,
            notes TEXT,
            book_url TEXT,
            pyq_url TEXT,
            FOREIGN KEY (subject_id) REFERENCES subjects(id)
        );

        CREATE TABLE IF NOT EXISTS quiz_questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            chapter_id TEXT,
            question TEXT NOT NULL,
            option_a TEXT,
            option_b TEXT,
            option_c TEXT,
            option_d TEXT,
            correct_answer INTEGER,
            explanation TEXT,
            difficulty TEXT DEFAULT 'medium',
            FOREIGN KEY (chapter_id) REFERENCES chapters(id)
        );

        CREATE TABLE IF NOT EXISTS user_progress (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            chapter_id TEXT,
            module_id TEXT,
            completed INTEGER DEFAULT 0,
            completed_at TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );

        CREATE TABLE IF NOT EXISTS quiz_attempts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            chapter_id TEXT,
            score INTEGER,
            total INTEGER,
            difficulty TEXT,
            attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );

        CREATE TABLE IF NOT EXISTS user_goals (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER UNIQUE,
            daily_minutes INTEGER DEFAULT 30,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
    """)

    db.commit()
    seed_data(db)
    db.close()

def seed_data(db):
    cursor = db.cursor()

    # Seed modules
    modules = [
        ('class10', 'Class 10', 'CBSE Class 10 Board Preparation', '["maths","science","english","social"]'),
        ('class11', 'Class 11', 'CBSE Class 11', '["maths","physics","chemistry","biology"]'),
        ('class12', 'Class 12', 'CBSE Class 12 Board Preparation', '["maths","physics","chemistry","biology"]'),
        ('jee', 'JEE Prep', 'IIT JEE Main & Advanced', '["maths","physics","chemistry"]'),
        ('neet', 'NEET Prep', 'Medical Entrance Exam', '["physics","chemistry","biology"]'),
        ('cuet', 'CUET', 'Central University Entrance Test', '["maths","english","gk"]'),
        ('english', 'Learn English', 'Grammar, Vocabulary & Speaking', '["grammar","vocab","speaking","reading"]'),
    ]
    cursor.executemany(
        'INSERT OR IGNORE INTO modules (id, name, description, subjects) VALUES (?, ?, ?, ?)',
        modules
    )

    # Seed Class 10 Maths chapters
    chapters = [
        ('c10m1', 'maths', 'class10', 1, 'Real Numbers',
         'https://www.youtube.com/watch?v=q5uYsUGLkjI', 'Real Numbers - Class 10 | NCERT',
         'Real Numbers form the foundation of Class 10 Mathematics. Every positive integer can be expressed as a product of prime numbers (Fundamental Theorem of Arithmetic). Euclid\'s Division Lemma: For any two positive integers a and b, there exist unique q and r such that a = bq + r, where 0 ≤ r < b.',
         'https://ncert.nic.in/textbook/pdf/jemh101.pdf', 'https://cbseacademic.nic.in/'),

        ('c10m2', 'maths', 'class10', 2, 'Polynomials',
         'https://www.youtube.com/watch?v=z6u5o0dN-GI', 'Polynomials - Class 10 | NCERT',
         'A polynomial p(x) = aₙxⁿ + ... + a₁x + a₀. The degree of a polynomial is the highest power of x. Zeroes of polynomial are values of x where p(x) = 0. For quadratic ax² + bx + c: Sum of zeroes = -b/a, Product of zeroes = c/a.',
         'https://ncert.nic.in/textbook/pdf/jemh102.pdf', 'https://cbseacademic.nic.in/'),

        ('c10m3', 'maths', 'class10', 3, 'Linear Equations',
         'https://www.youtube.com/watch?v=6R8mFUEy4ks', 'Linear Equations - Class 10 | NCERT',
         'A pair of linear equations: a₁x + b₁y + c₁ = 0 and a₂x + b₂y + c₂ = 0. Methods: Graphical, Substitution, Elimination. Unique solution when lines intersect. No solution when parallel. Infinite solutions when coincident.',
         'https://ncert.nic.in/textbook/pdf/jemh103.pdf', 'https://cbseacademic.nic.in/'),

        ('c10m4', 'maths', 'class10', 4, 'Quadratic Equations',
         'https://www.youtube.com/watch?v=MxBiYX4suPs', 'Quadratic Equations - Class 10 | NCERT',
         'A quadratic equation: ax² + bx + c = 0 where a ≠ 0. Quadratic Formula: x = (-b ± √(b²-4ac)) / 2a. Discriminant D = b² - 4ac. D>0: two real roots, D=0: equal roots, D<0: no real roots.',
         'https://ncert.nic.in/textbook/pdf/jemh104.pdf', 'https://cbseacademic.nic.in/'),

        ('c10m5', 'maths', 'class10', 5, 'Arithmetic Progressions',
         'https://www.youtube.com/watch?v=SfIEgIzAvbI', 'Arithmetic Progressions - Class 10 | NCERT',
         'AP: sequence with constant common difference d. nth term: aₙ = a + (n-1)d. Sum of n terms: Sₙ = n/2[2a + (n-1)d]. Examples: 2,5,8,11 (d=3), 10,7,4,1 (d=-3).',
         'https://ncert.nic.in/textbook/pdf/jemh105.pdf', 'https://cbseacademic.nic.in/'),
    ]
    cursor.executemany(
        'INSERT OR IGNORE INTO chapters (id, subject_id, module_id, number, name, video_url, video_label, notes, book_url, pyq_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        chapters
    )

    # Seed quiz questions for Chapter 1
    questions = [
        ('c10m1', 'According to the Fundamental Theorem of Arithmetic, every composite number can be expressed as:', 'Sum of primes', 'Product of primes', 'Difference of primes', 'Quotient of primes', 1, 'Every composite number can be expressed as a product of primes uniquely.', 'easy'),
        ('c10m1', 'Which of the following is an irrational number?', '√4', '√9', '√16', '√2', 3, '√2 = 1.41421... is non-terminating, non-repeating — hence irrational.', 'easy'),
        ('c10m1', 'HCF of 12 and 18 is:', '2', '3', '6', '9', 2, '12 = 2²×3, 18 = 2×3². HCF = 2×3 = 6.', 'medium'),
        ('c10m1', 'The decimal expansion of 1/3 is:', '0.3', '0.33', '0.333...', '0.313', 2, '1/3 = 0.333... — non-terminating but repeating.', 'easy'),
        ('c10m1', 'LCM of 4 and 6 is:', '12', '6', '24', '2', 0, 'LCM(4,6) = 12. 4=2², 6=2×3. LCM=2²×3=12.', 'easy'),
        ('c10m1', 'Euclid\'s Division Lemma: a = bq + r where r satisfies:', '0 < r < b', '0 ≤ r < b', '0 < r ≤ b', '0 ≤ r ≤ b', 1, 'r must satisfy 0 ≤ r < b.', 'medium'),
        ('c10m1', 'HCF of two consecutive integers is:', '0', '1', '2', 'The larger number', 1, 'Consecutive integers share no common factor > 1.', 'easy'),
        ('c10m1', '√5 is:', 'Rational', 'Irrational', 'Integer', 'Natural', 1, 'Square root of any prime is irrational.', 'easy'),
        ('c10m1', 'Which has a terminating decimal expansion?', '1/7', '1/3', '1/4', '1/9', 2, '1/4 = 0.25. Denominator 4 = 2² has only factor 2.', 'medium'),
        ('c10m1', 'If HCF(a,b) = 5 and LCM(a,b) = 60, then a × b =', '12', '55', '300', '65', 2, 'HCF × LCM = a × b → 5 × 60 = 300.', 'hard'),
    ]
    cursor.executemany(
        'INSERT OR IGNORE INTO quiz_questions (chapter_id, question, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        questions
    )

    db.commit()

# ===== HELPERS =====
def generate_otp():
    return ''.join(random.choices(string.digits, k=4))

def row_to_dict(row):
    return dict(row) if row else None

# ===== SERVE FRONTEND =====
@app.route('/')
def index():
    return send_from_directory('../frontend', 'index.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('../frontend', path)

# ===== AUTH ENDPOINTS =====
@app.route('/api/send-otp', methods=['POST'])
def send_otp():
    data = request.json
    phone = data.get('phone', '').strip()
    if len(phone) != 10 or not phone.isdigit():
        return jsonify({'success': False, 'message': 'Invalid phone number'}), 400

    otp = '1234'  # Fixed for demo; in production, generate and send via SMS
    expires = datetime.now() + timedelta(minutes=10)

    db = get_db()
    db.execute('INSERT INTO otps (phone, otp, expires_at) VALUES (?, ?, ?)', (phone, otp, expires))
    db.commit()
    db.close()

    print(f"[OTP] Sent {otp} to +91{phone}")  # In production: integrate SMS API (Twilio, MSG91 etc.)
    return jsonify({'success': True, 'message': f'OTP sent to +91{phone}', 'demo_otp': otp})

@app.route('/api/verify-otp', methods=['POST'])
def verify_otp():
    data = request.json
    phone = data.get('phone', '').strip()
    otp = data.get('otp', '').strip()

    # For demo, always accept 1234
    if otp != '1234':
        return jsonify({'success': False, 'message': 'Invalid OTP'}), 400

    db = get_db()
    user = db.execute('SELECT * FROM users WHERE phone = ?', (phone,)).fetchone()
    if not user:
        db.execute('INSERT INTO users (phone) VALUES (?)', (phone,))
        db.commit()
        user = db.execute('SELECT * FROM users WHERE phone = ?', (phone,)).fetchone()

    result = row_to_dict(user)
    db.close()
    return jsonify({'success': True, 'user': result, 'is_new': not result.get('name')})

@app.route('/api/save-name', methods=['POST'])
def save_name():
    data = request.json
    phone = data.get('phone')
    name = data.get('name', '').strip()
    if not name:
        return jsonify({'success': False, 'message': 'Name required'}), 400

    db = get_db()
    db.execute('UPDATE users SET name = ? WHERE phone = ?', (name, phone))
    db.commit()
    user = db.execute('SELECT * FROM users WHERE phone = ?', (phone,)).fetchone()
    db.close()
    return jsonify({'success': True, 'user': row_to_dict(user)})

@app.route('/api/save-language', methods=['POST'])
def save_language():
    data = request.json
    phone = data.get('phone')
    lang = data.get('language', 'en')

    db = get_db()
    db.execute('UPDATE users SET language = ? WHERE phone = ?', (lang, phone))
    db.commit()
    db.close()
    return jsonify({'success': True})

# ===== CONTENT ENDPOINTS =====
@app.route('/api/modules', methods=['GET'])
def get_modules():
    db = get_db()
    modules = db.execute('SELECT * FROM modules').fetchall()
    db.close()
    return jsonify([row_to_dict(m) for m in modules])

@app.route('/api/chapters/<module_id>/<subject_id>', methods=['GET'])
def get_chapters(module_id, subject_id):
    db = get_db()
    chapters = db.execute(
        'SELECT * FROM chapters WHERE module_id = ? AND subject_id = ? ORDER BY number',
        (module_id, subject_id)
    ).fetchall()
    db.close()
    return jsonify([row_to_dict(c) for c in chapters])

@app.route('/api/quiz/<chapter_id>', methods=['GET'])
def get_quiz(chapter_id):
    difficulty = request.args.get('difficulty', 'easy')
    db = get_db()
    questions = db.execute(
        'SELECT * FROM quiz_questions WHERE chapter_id = ? AND difficulty = ? ORDER BY RANDOM() LIMIT 10',
        (chapter_id, difficulty)
    ).fetchall()
    if not questions:
        questions = db.execute(
            'SELECT * FROM quiz_questions WHERE chapter_id = ? ORDER BY RANDOM() LIMIT 10',
            (chapter_id,)
        ).fetchall()
    db.close()
    return jsonify([row_to_dict(q) for q in questions])

# ===== PROGRESS ENDPOINTS =====
@app.route('/api/progress', methods=['GET'])
def get_progress():
    phone = request.args.get('phone')
    db = get_db()
    user = db.execute('SELECT id FROM users WHERE phone = ?', (phone,)).fetchone()
    if not user:
        db.close()
        return jsonify({'error': 'User not found'}), 404

    progress = db.execute(
        'SELECT * FROM user_progress WHERE user_id = ?',
        (user['id'],)
    ).fetchall()
    scores = db.execute(
        'SELECT * FROM quiz_attempts WHERE user_id = ? ORDER BY attempted_at DESC LIMIT 20',
        (user['id'],)
    ).fetchall()
    db.close()

    return jsonify({
        'completed_chapters': [p['chapter_id'] for p in progress if p['completed']],
        'quiz_scores': [row_to_dict(s) for s in scores]
    })

@app.route('/api/complete-chapter', methods=['POST'])
def complete_chapter():
    data = request.json
    phone = data.get('phone')
    chapter_id = data.get('chapter_id')
    module_id = data.get('module_id')

    db = get_db()
    user = db.execute('SELECT id FROM users WHERE phone = ?', (phone,)).fetchone()
    if user:
        db.execute('''
            INSERT OR REPLACE INTO user_progress (user_id, chapter_id, module_id, completed, completed_at)
            VALUES (?, ?, ?, 1, ?)
        ''', (user['id'], chapter_id, module_id, datetime.now()))
        db.commit()
    db.close()
    return jsonify({'success': True})

@app.route('/api/save-quiz', methods=['POST'])
def save_quiz():
    data = request.json
    phone = data.get('phone')
    chapter_id = data.get('chapter_id')
    score = data.get('score')
    total = data.get('total')
    difficulty = data.get('difficulty', 'easy')

    db = get_db()
    user = db.execute('SELECT id FROM users WHERE phone = ?', (phone,)).fetchone()
    if user:
        db.execute('''
            INSERT INTO quiz_attempts (user_id, chapter_id, score, total, difficulty)
            VALUES (?, ?, ?, ?, ?)
        ''', (user['id'], chapter_id, score, total, difficulty))
        db.commit()
    db.close()
    return jsonify({'success': True})

@app.route('/api/set-goal', methods=['POST'])
def set_goal():
    data = request.json
    phone = data.get('phone')
    minutes = data.get('minutes', 30)

    db = get_db()
    user = db.execute('SELECT id FROM users WHERE phone = ?', (phone,)).fetchone()
    if user:
        db.execute('''
            INSERT OR REPLACE INTO user_goals (user_id, daily_minutes)
            VALUES (?, ?)
        ''', (user['id'], minutes))
        db.commit()
    db.close()
    return jsonify({'success': True})

@app.route('/api/word-of-day', methods=['GET'])
def word_of_day():
    words = [
        {'word': 'Perseverance', 'meaning': 'Continued effort despite difficulty or delay'},
        {'word': 'Diligence', 'meaning': 'Careful and hard work; persistent effort'},
        {'word': 'Tenacity', 'meaning': 'The quality of being very determined'},
        {'word': 'Eloquent', 'meaning': 'Fluent or persuasive in speaking or writing'},
        {'word': 'Pragmatic', 'meaning': 'Dealing with things sensibly and realistically'},
    ]
    import datetime
    day = datetime.date.today().day
    return jsonify(words[day % len(words)])

# ===== STATS =====
@app.route('/api/stats/<phone>', methods=['GET'])
def get_stats(phone):
    db = get_db()
    user = db.execute('SELECT * FROM users WHERE phone = ?', (phone,)).fetchone()
    if not user:
        db.close()
        return jsonify({'error': 'Not found'}), 404

    uid = user['id']
    chapters = db.execute('SELECT COUNT(*) as c FROM user_progress WHERE user_id = ? AND completed = 1', (uid,)).fetchone()
    quizzes = db.execute('SELECT COUNT(*) as c FROM quiz_attempts WHERE user_id = ?', (uid,)).fetchone()
    db.close()

    return jsonify({
        'chapters_done': chapters['c'],
        'quizzes_done': quizzes['c'],
    })

if __name__ == '__main__':
    init_db()
    print("\n" + "="*50)
    print("  Our School - Backend Running!")
    print("  URL: http://localhost:5000")
    print("  Open frontend/index.html in browser")
    print("="*50 + "\n")
    app.run(debug=True, port=5000)