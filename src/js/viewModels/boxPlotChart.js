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

                self.inputData = 'nom\\tlow\\tq1\\tq2\\tq3\\thigh\\tx1\\tx2\\tx3\\tx4\\nbadr\\t1\\t6\\t11\\t16\\t21\\t36\\t27\\t28\\t15\\nwafae\\t12\\t17\\t22\\t27\\t32\\t20\\t40\\t17\\t40\\nyahya\\t14\\t19\\t24\\t29\\t34\\t10\\t38\\t28\\t35\\nkarim\\t1\\t6\\t11\\t16\\t21\\t40\\t9\\t37\\t8\\nsimo\\t7\\t12\\t17\\t22\\t27\\t35\\t14\\t4\\t10\\nanoir\\t20\\t25\\t30\\t35\\t40\\t21\\t25\\t2\\t25\\namine\\t8\\t13\\t18\\t23\\t28\\t35\\t18\\t13\\t22\\nabdelali\\t7\\t12\\t17\\t22\\t27\\t27\\t17\\t35\\t7';
                
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