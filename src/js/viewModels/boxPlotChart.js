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

//                self.inputData = 'nom\\tlow\\tq1\\tq2\\tq3\\thigh\\tx1\\tx2\\tx3\\tx4\\nbadr\\t1\\t6\\t11\\t16\\t21\\t36\\t27\\t28\\t15\\nwafae\\t12\\t17\\t22\\t27\\t32\\t20\\t40\\t17\\t40\\nyahya\\t14\\t19\\t24\\t29\\t34\\t10\\t38\\t28\\t35\\nkarim\\t1\\t6\\t11\\t16\\t21\\t40\\t9\\t37\\t8\\nsimo\\t7\\t12\\t17\\t22\\t27\\t35\\t14\\t4\\t10\\nanoir\\t20\\t25\\t30\\t35\\t40\\t21\\t25\\t2\\t25\\namine\\t8\\t13\\t18\\t23\\t28\\t35\\t18\\t13\\t22\\nabdelali\\t7\\t12\\t17\\t22\\t27\\t27\\t17\\t35\\t7';
                self.inputData = 'Course\\tSchool 1\\tSchool 2\\tSchool 3\\tSchool 4\\tSchool 5\\nmath\\t19\\t17\\t11\\t18\\t13\\nphysics\\t19\\t10\\t18\\t19\\t20\\narabic\\t18\\t13\\t15\\t11\\t11\\ngeo\\t18\\t13\\t10\\t10\\t17\\ncomputing\\t10\\t12\\t20\\t10\\t10\\nsport\\t12\\t16\\t10\\t10\\t16\\nmath\\t14\\t10\\t17\\t19\\t17\\nphysics\\t15\\t17\\t17\\t17\\t12\\narabic\\t12\\t15\\t15\\t15\\t13\\nmath\\t19\\t15\\t10\\t15\\t17\\nphysics\\t10\\t12\\t13\\t10\\t15\\narabic\\t15\\t19\\t10\\t16\\t16\\ngeo\\t12\\t15\\t16\\t10\\t14\\ncomputing\\t16\\t11\\t14\\t10\\t14\\nsport\\t12\\t16\\t19\\t12\\t11\\nmath\\t13\\t11\\t10\\t18\\t15\\nphysics\\t19\\t15\\t17\\t16\\t11\\narabic\\t19\\t15\\t13\\t13\\t20\\nmath\\t20\\t11\\t11\\t13\\t11\\nphysics\\t15\\t13\\t19\\t18\\t17\\narabic\\t18\\t11\\t14\\t14\\t11\\ngeo\\t19\\t11\\t18\\t16\\t15\\ncomputing\\t14\\t11\\t11\\t20\\t10\\nsport\\t18\\t12\\t19\\t16\\t20\\nmath\\t16\\t18\\t16\\t14\\t11\\nphysics\\t15\\t13\\t16\\t16\\t17\\narabic\\t18\\t17\\t15\\t17\\t16\\nmath\\t17\\t16\\t17\\t17\\t12\\nphysics\\t12\\t11\\t20\\t13\\t16\\narabic\\t19\\t12\\t18\\t19\\t12\\ngeo\\t14\\t19\\t16\\t16\\t14\\ncomputing\\t19\\t18\\t13\\t13\\t15\\nsport\\t16\\t11\\t12\\t12\\t17\\nmath\\t17\\t10\\t13\\t10\\t11\\nphysics\\t16\\t10\\t11\\t18\\t15\\narabic\\t12\\t18\\t16\\t11\\t14\\nmath\\t14\\t14\\t12\\t15\\t13\\nphysics\\t11\\t12\\t10\\t15\\t17\\narabic\\t12\\t14\\t20\\t10\\t20\\ngeo\\t17\\t12\\t14\\t11\\t17\\ncomputing\\t18\\t19\\t15\\t19\\t15\\nsport\\t20\\t10\\t20\\t18\\t11\\nmath\\t13\\t16\\t18\\t18\\t11\\nphysics\\t20\\t12\\t14\\t10\\t18\\narabic\\t17\\t17\\t16\\t11\\t18\\nmath\\t17\\t13\\t13\\t20\\t14\\nphysics\\t14\\t12\\t20\\t18\\t19\\narabic\\t14\\t19\\t14\\t11\\t15\\ngeo\\t15\\t19\\t19\\t10\\t13\\ncomputing\\t11\\t13\\t10\\t12\\t19\\nsport\\t15\\t15\\t14\\t19\\t15\\nmath\\t11\\t19\\t16\\t17\\t16\\nphysics\\t10\\t10\\t12\\t19\\t20\\narabic\\t12\\t10\\t14\\t17\\t18\\nmath\\t11\\t16\\t10\\t18\\t15\\nphysics\\t18\\t13\\t15\\t18\\t19\\narabic\\t13\\t17\\t17\\t18\\t14\\ngeo\\t18\\t16\\t10\\t14\\t13\\ncomputing\\t19\\t14\\t13\\t12\\t13\\nsport\\t13\\t16\\t14\\t10\\t14\\nmath\\t16\\t13\\t14\\t12\\t16\\nphysics\\t19\\t20\\t14\\t10\\t12\\narabic\\t19\\t10\\t18\\t19\\t12\\nmath\\t17\\t12\\t15\\t15\\t11\\nphysics\\t16\\t13\\t19\\t13\\t17\\narabic\\t17\\t10\\t12\\t17\\t18\\ngeo\\t13\\t17\\t10\\t18\\t16\\ncomputing\\t11\\t16\\t12\\t15\\t10\\nsport\\t14\\t14\\t12\\t15\\t20\\nmath\\t10\\t16\\t15\\t14\\t16\\nphysics\\t15\\t10\\t16\\t17\\t19\\narabic\\t11\\t20\\t17\\t17\\t15\\nmath\\t12\\t19\\t18\\t16\\t14\\nphysics\\t15\\t16\\t16\\t12\\t11\\narabic\\t16\\t12\\t18\\t18\\t20\\ngeo\\t17\\t13\\t11\\t14\\t15\\ncomputing\\t15\\t17\\t16\\t19\\t10\\nsport\\t15\\t13\\t10\\t17\\t11\\nmath\\t11\\t12\\t10\\t18\\t14\\nphysics\\t14\\t18\\t12\\t16\\t10\\narabic\\t12\\t17\\t12\\t17\\t17\\nmath\\t10\\t11\\t12\\t12\\t16\\nphysics\\t13\\t15\\t15\\t11\\t20\\narabic\\t12\\t16\\t19\\t10\\t10\\ngeo\\t12\\t14\\t17\\t20\\t19\\ncomputing\\t12\\t10\\t14\\t20\\t16\\nsport\\t11\\t15\\t15\\t14\\t16\\nmath\\t15\\t13\\t17\\t17\\t13\\nphysics\\t19\\t11\\t15\\t10\\t20\\narabic\\t13\\t10\\t10\\t16\\t16\\nmath\\t12\\t11\\t11\\t20\\t19\\nphysics\\t15\\t16\\t18\\t16\\t15\\narabic\\t13\\t20\\t10\\t18\\t16\\ngeo\\t11\\t11\\t20\\t13\\t13\\ncomputing\\t12\\t20\\t13\\t17\\t18\\nsport\\t10\\t12\\t10\\t10\\t16\\nmath\\t18\\t19\\t10\\t16\\t19\\nphysics\\t13\\t20\\t20\\t15\\t12\\narabic\\t14\\t20\\t17\\t20\\t19\\nmath\\t20\\t17\\t10\\t10\\t11\\nphysics\\t17\\t19\\t15\\t17\\t19\\narabic\\t14\\t20\\t18\\t13\\t15\\ngeo\\t18\\t17\\t20\\t19\\t14\\ncomputing\\t16\\t12\\t19\\t13\\t18\\nsport\\t16\\t17\\t16\\t18\\t13\\nmath\\t19\\t17\\t20\\t11\\t14\\nphysics\\t16\\t18\\t17\\t19\\t15\\narabic\\t11\\t12\\t10\\t19\\t18\\nmath\\t10\\t15\\t12\\t10\\t18\\nphysics\\t13\\t10\\t16\\t10\\t10\\narabic\\t14\\t19\\t13\\t18\\t16\\ngeo\\t15\\t20\\t19\\t18\\t10\\ncomputing\\t12\\t20\\t16\\t19\\t17\\nsport\\t15\\t19\\t18\\t15\\t11\\nmath\\t11\\t13\\t13\\t15\\t11\\nphysics\\t18\\t10\\t19\\t16\\t10\\narabic\\t12\\t19\\t14\\t12\\t16\\nmath\\t19\\t19\\t19\\t14\\t11\\nphysics\\t16\\t16\\t18\\t19\\t12\\narabic\\t11\\t11\\t13\\t10\\t14\\ngeo\\t16\\t10\\t14\\t17\\t14\\ncomputing\\t20\\t10\\t14\\t16\\t16\\nsport\\t17\\t12\\t15\\t11\\t15\\nmath\\t15\\t20\\t12\\t10\\t15\\nphysics\\t20\\t12\\t17\\t13\\t14\\narabic\\t13\\t14\\t15\\t11\\t15\\nmath\\t11\\t16\\t10\\t19\\t18\\nphysics\\t20\\t16\\t19\\t17\\t11\\narabic\\t20\\t18\\t13\\t10\\t15\\ngeo\\t17\\t18\\t20\\t18\\t19\\ncomputing\\t20\\t18\\t11\\t20\\t19\\nsport\\t11\\t16\\t10\\t13\\t15\\nmath\\t15\\t18\\t10\\t17\\t19\\nphysics\\t12\\t10\\t19\\t11\\t14\\narabic\\t19\\t10\\t12\\t18\\t14\\nmath\\t18\\t15\\t14\\t20\\t20\\nphysics\\t15\\t11\\t18\\t11\\t12\\narabic\\t15\\t16\\t15\\t16\\t19\\ngeo\\t20\\t16\\t16\\t15\\t16\\ncomputing\\t11\\t19\\t13\\t15\\t20\\nsport\\t13\\t20\\t19\\t12\\t13\\nmath\\t10\\t18\\t13\\t11\\t16\\nphysics\\t10\\t13\\t16\\t11\\t17\\narabic\\t18\\t17\\t16\\t11\\t12\\nmath\\t10\\t12\\t18\\t19\\t16\\nphysics\\t10\\t17\\t17\\t19\\t12\\narabic\\t15\\t14\\t13\\t14\\t14\\ngeo\\t10\\t15\\t10\\t18\\t20\\ncomputing\\t20\\t15\\t15\\t18\\t14\\nsport\\t15\\t15\\t12\\t20\\t10\\nmath\\t17\\t16\\t19\\t15\\t17\\nphysics\\t19\\t18\\t14\\t15\\t19\\narabic\\t10\\t16\\t12\\t11\\t13\\nmath\\t13\\t13\\t14\\t16\\t12\\nphysics\\t10\\t19\\t13\\t18\\t13\\narabic\\t11\\t20\\t18\\t16\\t18\\ngeo\\t15\\t16\\t15\\t16\\t18\\ncomputing\\t14\\t18\\t14\\t19\\t17\\nsport\\t12\\t15\\t12\\t11\\t10\\nmath\\t14\\t19\\t12\\t17\\t10\\nphysics\\t18\\t14\\t13\\t10\\t14\\narabic\\t15\\t18\\t14\\t20\\t19\\nmath\\t17\\t19\\t12\\t11\\t11\\nphysics\\t15\\t16\\t18\\t10\\t19\\narabic\\t15\\t12\\t18\\t16\\t17\\ngeo\\t20\\t14\\t15\\t15\\t16\\ncomputing\\t18\\t13\\t13\\t19\\t12\\nsport\\t15\\t18\\t17\\t18\\t13\\nmath\\t17\\t13\\t16\\t13\\t18\\nphysics\\t19\\t16\\t11\\t19\\t13\\narabic\\t11\\t12\\t11\\t18\\t14\\nmath\\t17\\t11\\t13\\t13\\t13\\nphysics\\t18\\t12\\t17\\t20\\t20\\narabic\\t15\\t20\\t18\\t18\\t18\\ngeo\\t17\\t17\\t15\\t14\\t13\\ncomputing\\t16\\t13\\t15\\t17\\t16\\nsport\\t10\\t20\\t11\\t12\\t12';

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
                self.parseDataByColumns = function () {
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


                //parse data by columns
                self.parseDataByRows = function () {
                    var rows = [];

                    for (var i = 1; i < self.splitedData.length; i++) {
                        if (self.splitedData[i][0] && !rows[self.splitedData[i][0]]) {
                            rows[self.splitedData[i][0]] = [];
                        }
                        for (var j = 1; j < self.splitedData[i].length; j++) {

                            //check if serie with of the line j exist
                            if (self.splitedData[0][j] && !rows[self.splitedData[i][0]][self.splitedData[0][j]]) {
                                rows[self.splitedData[i][0]][self.splitedData[0][j]] = [];
                            }

                            // check if the value is numeric
                            if (isNumber(self.splitedData[i][j])) {
                                rows[self.splitedData[i][0]][self.splitedData[0][j]].push(self.splitedData[i][j]);
                            }

//                            console.log("splitedData",self.splitedData[i][j]);
//                            console.log("rows",rows[self.splitedData[i][0]][self.splitedData[0][j]]);
                        }
                    }
                    console.log(rows);

                    for (var serieName in rows) {
                        var serie = rows[serieName];
                        for (var groupName in serie) {
                            if(serie[groupName].length>0){
                                self.getChartValues(serie[groupName]);
                            }
                            
                        }
                    }
                };
                //return the low high q1 q2 and q3
                self.getChartValues = function (serie) {
                    var ret={};
                    serie.sort();
                    ret["low"] = serie[0];
                    ret["high"] = serie.slice(-1)[0];
                    ret["q2"] = getMedian(serie);
                    ret["low"] = serie[0];
                    ret["low"] = serie[0];
                    
                };
                
                function getMedian(arr){
                    var len = arr.length;
                    if(arr.length%2 === 0)
                        return (arr[len/2-1]+arr[len/2])/2;
                    return arr[(len-1)/2];
                }

                function isNumber(n) {
                    return !isNaN(parseFloat(n)) && isFinite(n);
                }

                self.parseDataByColumns();
            }

            /*
             * Returns a constructor for the ViewModel so that the ViewModel is constructed
             * each time the view is displayed.  Return an instance of the ViewModel if
             * only one instance of the ViewModel is needed.
             */
            return new BoxPlotChartViewModel();
        }
);