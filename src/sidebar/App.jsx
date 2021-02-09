import React from 'react';
import ReactDOM from 'react-dom';
import ProbeNav from './components/SideBar.jsx';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from 'i18next';

i18n
		.use(Backend)
		.use(LanguageDetector)
		.init({
			fallbackLng: 'en',
			lng: 'en',
			debug: true,
			interpolation: {
			  escapeValue: false, // not needed for react as it escapes by default
			},
		});

ReactDOM.render(<ProbeNav i18n={i18n}/>, document.getElementById('Nav'));