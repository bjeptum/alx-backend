#!/usr/bin/env python3
"""
Simple flask app
Supports two languages: English and French
Uses Flask-Babel to manage localization
"""
from flask import Flask, render_template
from flask_babel import Babel, _


# Flask application setup
app = Flask(__name__)


class Config:
    """Config class to store Babel configuration"""
    LANGUAGES= ['en', 'fr']
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


# Configure the Flask app with defined settings
app.config.from_object(Config)
babel = Babel(app)


@app.route('/')
def home() -> str:
    """Home Page"""
    return render_template('1-index.html')


if __name__ == '__main__':
    app.run(debug=True)
