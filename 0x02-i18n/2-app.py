#!/usr/bin/env python3
"""Simple flask app
Uses Flask-Babel to manage localization and
translations
Uses Accept-Language header to infer user's
language preference
"""
from flask import Flask, render_template, request
from flask_babel import Babel, _


# Flask application setup
app = Flask(__name__)


class Config:
    """Config class to store Babel configuration"""
    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


# Configure the Flask app with defined settings
app.config.from_objects(Config)
babel = Babel(app)


@babel.localeselector
def get_locale() -> str:
    """Select locale based on best match"""
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/')
def home() -> str:
    """Render Home Page"""
    return render_template('2-index.html')


if __name__ == "__main__":
    """Run the Flask app in debug mode"""
    app.run(debug=True)
