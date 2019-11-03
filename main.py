from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('home.html')


@app.route('/instances/<instance>')
def detail(instance):
    return render_template('detail.html', instance=instance)
