#!/usr/bin/env python3
"""
Simple flask app
"""
from flask import Flask, render_template
from flask_babel import Babel, _


app = Flask(__name__)


# Config class to store Babel configuration
class Config:
    LANGUAGE = ['en','fr']
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'

app.config.from_object(Config)
babel=Babel(app)


@app.route('/')
def home() -> str:
    """Home Page"""
    return render_template('1-index.html')

    if __name__ == '__main__':
        app.run(debug=True)
