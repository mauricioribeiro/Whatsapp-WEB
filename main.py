from flask import Flask, render_template, request, redirect
import codecs, requests, csv

app = Flask(__name__)
API_URL = 'http://localhost:8000/api'


@app.route('/')
def home():
    return render_template('home.html')


@app.route('/instancias/<instance>')
def detail(instance):
    return render_template('instance.html', instance=instance)


@app.route('/instancias/<instance>/upload', methods=['POST'])
def upload(instance):
    file = request.files['file']

    if file:
        stream, line = codecs.iterdecode(file.stream, 'utf-8'), 0

        for row in csv.reader(stream, dialect=csv.excel):
            if row and line > 0:
                r = requests.post(API_URL + '/send/%s' % instance, {
                    'to': '55' + row[0],
                    'message': row[1]
                })

                if r.status_code == 200:
                    print('Linha %d enviada com sucesso!' % line)
                else:
                    print('Falha ao enviar linha %d: %s' % (line, r.content))

            line += 1

    return redirect('/instancias/%s' % instance)
