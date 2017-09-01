/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

/* eslint-env node */

const path = require( 'path' );
const webpack = require( 'webpack' );
const { bundler } = require( '@ckeditor/ckeditor5-dev-utils' );
const CKEditorWebpackPlugin = require( '@ckeditor/ckeditor5-dev-webpack-plugin' );
const BabiliPlugin = require( 'babel-minify-webpack-plugin' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const buildConfig = require( './build-config' );

module.exports = {
	devtool: 'source-map',

	entry: path.resolve( __dirname, 'ckeditor.js' ),

	output: {
		path: path.resolve( __dirname, 'build' ),
		filename: 'ckeditor.js',
		libraryTarget: 'umd'
	},

	plugins: [
		new ExtractTextPlugin( 'ckeditor.css' ),
		new CKEditorWebpackPlugin( {
			languages: [ buildConfig.language ]
		} ),
		new BabiliPlugin( null, {
			comments: false
		} ),
		new webpack.BannerPlugin( {
			banner: bundler.getLicenseBanner(),
			raw: true
		} )
	],

	module: {
		rules: [
			{
				test: /\.svg$/,
				use: [ 'raw-loader' ]
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract( {
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								minimize: true
							}
						},
						'sass-loader'
					]
				} )
			}
		]
	}
};
