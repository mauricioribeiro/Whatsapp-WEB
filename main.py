from flask import Flask
from flask import render_template
import os, requests

app = Flask(__name__)
API_URL = os.getenv('API_URL', 'http://localhost:8080/api/')


@app.route('/')
def home():
    instances, error = [], True
    r = requests.get(API_URL + 'instances')

    if r.status_code == 200:
        instances = r.json()['instances']
        error = False
    else:
        app.logger.error('Failed to connect to API. Got %d' % r.status_code)

    return render_template('home.html', instances=instances, error=error)


@app.route('/instances/<instance>')
def detail(instance):
    return render_template('detail.html', instance=instance)
