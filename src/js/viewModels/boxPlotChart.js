/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */

/*
 * BoxPlot charts view model
 * The data visualization based on column : for example the column named "low" is the values of low and the column named q1 is the values of q1
 * And the alphanumeric columns are considered as serie name joined by " " 
 * the group names are the header of the input data
 */

define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojselectcombobox', 'ojs/ojchart', 'ojs/ojinputtext',
    'ojs/ojlabel'],
        function (oj, ko, $) {

            function BoxPlotChartViewModel() {
                var self = this;

                self.columns = [];
                self.cols = [];
                self.alphanumeric = [];
                self.numeric = [];

                self.items = [];
                self.series = [];

                self.inputData = 'nom\\tlow\\tq1\\tq2\\tq3\\thigh\\tx2\\ty2\\tx3\\tx4\\nbadr\\t1\\t2\\t3\\t4\\t5\\t6\\t7\\t8\\t9\\nyahya\\t1\\t3\\t5\\t7\\t10\\t20\\t7\\t3\\t11\\nyahya\\t1\\t3\\t5\\t7\\t10\\t20\\t7\\t3\\t11\\nyahya\\t1\\t3\\t5\\t7\\t10\\t20\\t7\\t3\\t11';
                self.hiddenCategories = ko.observableArray([]);

                self.boxPlotSeriesValue = ko.observableArray([]);

                /* toggle buttons */
                self.orientationValue = ko.observable('vertical');
                // function that split data into rows columns header and cols that contain data without the header
                self.splitData = function () {
                    var rows = self.inputData.split(/\\n/);

                    self.splitedData = [];
                    self.header = [];
                    self.cols = [];
                    self.columns = [];

                    for (var i = 0; i < rows.length; i++) {
                        self.splitedData[i] = rows[i].split(/\\t/);
                    }
                    if (self.splitedData.length > 0) {
                        self.header = self.splitedData[0];
                        var matrix = self.splitedData;
                        for (var i = 0; i < self.header.length; i++) {
                            self.columns[i] = self.getColumnValues(matrix, i);
                            //clone the array self.columns to self.cols
                            self.cols[i] = self.columns[i].slice(0);
                            self.cols[i].shift();
                        }
                    }
                };
                
                // function that parse the input data
                self.parseData = function () {
                    self.splitData();
                    self.series = [];

                    self.items = [];
                    for (var i = 1; i < self.splitedData.length; i++) {
                        var item = {};
                        self.numeric = [];
                        self.alphanumeric = [];
                        for (var j = 0; j < self.splitedData[i].length; j++) {

                            if (self.header[j].toLowerCase() === "low") {
                                item["low"] = self.splitedData[i][j];
                            } else if (self.header[j].toLowerCase() === "q1") {
                                item["q1"] = self.splitedData[i][j];
                            } else if (self.header[j].toLowerCase() === "q2") {
                                item["q2"] = self.splitedData[i][j];
                            } else if (self.header[j].toLowerCase() === "q3") {
                                item["q3"] = self.splitedData[i][j];
                            } else if (self.header[j].toLowerCase() === "high") {
                                item["high"] = self.splitedData[i][j];
                            } else if (!self.cols[j].some(isNaN)) {  // the column is numeric and different to high, q1, q2, q3, low
                                self.numeric.push(self.splitedData[i][j]);
                            } else { // the column is alphanumeric
                                self.alphanumeric.push(self.splitedData[i][j]);
                            }
                        }
                        item["items"] = self.numeric;

                        if (!self.items[self.alphanumeric.join(" ")]) {
                            self.items[self.alphanumeric.join(" ")] = [];
                        }
                        self.items[self.alphanumeric.join(" ")].push(item);
                    }

                    for (var key in self.items) {
                        self.series.push({name: key, items: self.items[key]})
                    }
                    self.boxPlotSeriesValue(self.series);
                };
                
                // function that return the column n of a matrix 
                self.getColumnValues = function (matrix, n) {
                    return matrix.map(function (value, index) {
                        return value[n];
                    });
                };

                self.parseData();
            }

            /*
             * Returns a constructor for the ViewModel so that the ViewModel is constructed
             * each time the view is displayed.  Return an instance of the ViewModel if
             * only one instance of the ViewModel is needed.
             */
            return new BoxPlotChartViewModel();
        }
);