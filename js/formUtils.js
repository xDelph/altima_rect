import React, { Component } from 'react';

export default {
	getInputLabeled : function (labelText, attributs) {
		return (
			<label>{labelText}
				{this.getInput(attributs)}
			</label>
		)
	},

	getInput : function (attributs) {
		return React.createElement('input', attributs)
	},

	getSelectLabeled : function (labelText, attributs, options) {
		return (
			<label>{labelText}
				{this.getSelect(attributs, options)}
			</label>
		)
	},

	getSelect : function (attributs, options) {
		var reactOptions = [];
		for (var i = 0; i < options.length; i++) 
			reactOptions.push(
				React.createElement('option', {key: i, value: options[i]}, options[i])
			);

		return React.createElement('select', attributs, reactOptions)
	},

	getTextAreaLabeled : function (labelText, attributs) {
		return (
			<label>{labelText}
				{this.getTextArea(attributs)}
			</label>
		)
	},

	getTextArea : function (attributs) {
		return React.createElement('textarea', attributs)
	},

	getButton : function (attributs, text) {
		return React.createElement('button', attributs, text)
	}
}