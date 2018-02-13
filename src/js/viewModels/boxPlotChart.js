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
    'ojs/ojlabel', 'ojs/ojnavigationlist'],
        function (oj, ko, $) {

            function BoxPlotChartViewModel() {

                this.selectedItem = "simple";
                var self = this;

                self.columns = [];
                self.cols = [];
                self.alphanumeric = [];
                self.numeric = [];

                self.items = [];
                self.series = [];

                self.simpleInputData = 'nom\\tlow\\tq1\\tq2\\tq3\\thigh\\tx1\\tx2\\tx3\\tx4\\nbadr\\t1\\t6\\t11\\t16\\t21\\t36\\t27\\t28\\t15\\nwafae\\t12\\t17\\t22\\t27\\t32\\t20\\t40\\t17\\t40\\nyahya\\t14\\t19\\t24\\t29\\t34\\t10\\t38\\t28\\t35\\nkarim\\t1\\t6\\t11\\t16\\t21\\t40\\t9\\t37\\t8\\nsimo\\t7\\t12\\t17\\t22\\t27\\t35\\t14\\t4\\t10\\nanoir\\t20\\t25\\t30\\t35\\t40\\t21\\t25\\t2\\t25\\namine\\t8\\t13\\t18\\t23\\t28\\t35\\t18\\t13\\t22\\nabdelali\\t7\\t12\\t17\\t22\\t27\\t27\\t17\\t35\\t7';
                self.advancedInputData = 'Course\\tSchool 1\\tSchool 2\\tSchool 3\\tSchool 4\\tSchool 5\\nmath\\t15\\t8\\t1\\t7\\t1\\nphysics\\t1\\t10\\t10\\t2\\t11\\narabic\\t0\\t14\\t18\\t3\\t17\\ngeo\\t19\\t10\\t6\\t8\\t3\\ncomputing\\t11\\t7\\t11\\t9\\t19\\nsport\\t3\\t3\\t16\\t17\\t16\\nmath\\t11\\t11\\t10\\t2\\t17\\nphysics\\t3\\t5\\t9\\t7\\t17\\narabic\\t3\\t0\\t17\\t17\\t14\\nmath\\t8\\t0\\t11\\t14\\t9\\nphysics\\t8\\t11\\t6\\t7\\t12\\narabic\\t11\\t20\\t6\\t10\\t11\\ngeo\\t10\\t2\\t14\\t20\\t6\\ncomputing\\t17\\t2\\t1\\t12\\t18\\nsport\\t0\\t11\\t11\\t5\\t18\\nmath\\t19\\t9\\t18\\t0\\t11\\nphysics\\t16\\t16\\t4\\t14\\t7\\narabic\\t20\\t11\\t4\\t9\\t10\\nmath\\t17\\t13\\t18\\t17\\t1\\nphysics\\t1\\t17\\t4\\t8\\t16\\narabic\\t14\\t9\\t4\\t11\\t16\\ngeo\\t1\\t18\\t15\\t1\\t10\\ncomputing\\t20\\t0\\t2\\t10\\t5\\nsport\\t9\\t2\\t17\\t19\\t20\\nmath\\t12\\t7\\t15\\t16\\t13\\nphysics\\t10\\t1\\t14\\t11\\t19\\narabic\\t0\\t17\\t3\\t2\\t17\\nmath\\t0\\t0\\t0\\t3\\t19\\nphysics\\t3\\t5\\t6\\t2\\t18\\narabic\\t17\\t8\\t12\\t7\\t16\\ngeo\\t15\\t15\\t15\\t1\\t15\\ncomputing\\t11\\t12\\t20\\t13\\t12\\nsport\\t3\\t5\\t16\\t0\\t5\\nmath\\t18\\t3\\t10\\t16\\t18\\nphysics\\t14\\t17\\t5\\t3\\t4\\narabic\\t13\\t7\\t14\\t20\\t17\\nmath\\t12\\t11\\t14\\t17\\t4\\nphysics\\t1\\t0\\t9\\t12\\t11\\narabic\\t1\\t1\\t1\\t0\\t12\\ngeo\\t16\\t9\\t17\\t11\\t3\\ncomputing\\t19\\t4\\t17\\t9\\t6\\nsport\\t12\\t5\\t1\\t3\\t7\\nmath\\t10\\t2\\t14\\t12\\t5\\nphysics\\t6\\t19\\t2\\t8\\t13\\narabic\\t12\\t6\\t8\\t11\\t18\\nmath\\t2\\t15\\t9\\t6\\t3\\nphysics\\t6\\t14\\t5\\t1\\t16\\narabic\\t15\\t9\\t11\\t19\\t13\\ngeo\\t13\\t18\\t17\\t9\\t0\\ncomputing\\t9\\t2\\t15\\t3\\t1\\nsport\\t1\\t20\\t3\\t13\\t1\\nmath\\t4\\t0\\t15\\t18\\t7\\nphysics\\t15\\t7\\t12\\t18\\t13\\narabic\\t7\\t2\\t19\\t13\\t20\\nmath\\t0\\t3\\t15\\t6\\t9\\nphysics\\t11\\t19\\t17\\t2\\t2\\narabic\\t4\\t18\\t16\\t10\\t10\\ngeo\\t7\\t3\\t17\\t8\\t7\\ncomputing\\t7\\t15\\t1\\t6\\t15\\nsport\\t6\\t6\\t9\\t8\\t6\\nmath\\t6\\t4\\t16\\t17\\t3\\nphysics\\t13\\t18\\t5\\t9\\t12\\narabic\\t4\\t8\\t13\\t10\\t11\\nmath\\t11\\t3\\t8\\t10\\t14\\nphysics\\t9\\t1\\t18\\t18\\t6\\narabic\\t6\\t20\\t4\\t20\\t3\\ngeo\\t2\\t9\\t4\\t9\\t7\\ncomputing\\t5\\t14\\t3\\t18\\t13\\nsport\\t19\\t15\\t16\\t1\\t18\\nmath\\t17\\t12\\t16\\t20\\t19\\nphysics\\t6\\t6\\t3\\t16\\t8\\narabic\\t4\\t8\\t5\\t13\\t17\\nmath\\t0\\t3\\t2\\t17\\t4\\nphysics\\t10\\t14\\t4\\t15\\t18\\narabic\\t8\\t17\\t16\\t15\\t2\\ngeo\\t13\\t13\\t17\\t0\\t4\\ncomputing\\t14\\t14\\t7\\t3\\t6\\nsport\\t9\\t13\\t16\\t9\\t8\\nmath\\t13\\t20\\t17\\t12\\t13\\nphysics\\t19\\t8\\t4\\t13\\t18\\narabic\\t6\\t10\\t14\\t8\\t19\\nmath\\t13\\t7\\t1\\t15\\t11\\nphysics\\t4\\t4\\t19\\t12\\t13\\narabic\\t10\\t19\\t2\\t17\\t16\\ngeo\\t0\\t11\\t20\\t18\\t5\\ncomputing\\t15\\t1\\t2\\t11\\t0\\nsport\\t19\\t12\\t17\\t20\\t2\\nmath\\t9\\t4\\t5\\t18\\t3\\nphysics\\t17\\t7\\t0\\t16\\t7\\narabic\\t15\\t16\\t7\\t10\\t8\\nmath\\t10\\t16\\t13\\t1\\t6\\nphysics\\t9\\t20\\t17\\t10\\t14\\narabic\\t11\\t3\\t13\\t18\\t13\\ngeo\\t17\\t1\\t2\\t10\\t5\\ncomputing\\t5\\t12\\t0\\t16\\t7\\nsport\\t4\\t12\\t14\\t6\\t17\\nmath\\t0\\t10\\t3\\t20\\t15\\nphysics\\t12\\t20\\t14\\t16\\t1\\narabic\\t3\\t1\\t11\\t4\\t12\\nmath\\t20\\t15\\t3\\t1\\t8\\nphysics\\t2\\t13\\t12\\t2\\t11\\narabic\\t19\\t7\\t12\\t11\\t13\\ngeo\\t12\\t0\\t17\\t2\\t6\\ncomputing\\t9\\t6\\t17\\t6\\t1\\nsport\\t1\\t7\\t19\\t16\\t17\\nmath\\t8\\t0\\t10\\t20\\t15\\nphysics\\t15\\t8\\t3\\t2\\t14\\narabic\\t10\\t11\\t7\\t8\\t16\\nmath\\t15\\t9\\t19\\t1\\t8\\nphysics\\t0\\t9\\t16\\t17\\t14\\narabic\\t15\\t19\\t20\\t20\\t11\\ngeo\\t6\\t5\\t12\\t15\\t0\\ncomputing\\t15\\t7\\t12\\t10\\t16\\nsport\\t18\\t0\\t5\\t9\\t11\\nmath\\t4\\t5\\t12\\t9\\t17\\nphysics\\t20\\t13\\t3\\t10\\t20\\narabic\\t12\\t9\\t13\\t4\\t17\\nmath\\t18\\t17\\t17\\t10\\t7\\nphysics\\t1\\t12\\t8\\t14\\t3\\narabic\\t17\\t0\\t12\\t16\\t10\\ngeo\\t4\\t7\\t8\\t12\\t17\\ncomputing\\t16\\t9\\t13\\t14\\t14\\nsport\\t17\\t16\\t12\\t8\\t3\\nmath\\t13\\t16\\t17\\t3\\t17\\nphysics\\t19\\t19\\t11\\t1\\t3\\narabic\\t15\\t7\\t14\\t7\\t14\\nmath\\t3\\t3\\t9\\t10\\t4\\nphysics\\t9\\t15\\t8\\t6\\t17\\narabic\\t16\\t5\\t16\\t8\\t8\\ngeo\\t15\\t7\\t2\\t18\\t20\\ncomputing\\t4\\t8\\t5\\t18\\t9\\nsport\\t6\\t18\\t19\\t14\\t12\\nmath\\t14\\t2\\t12\\t12\\t6\\nphysics\\t1\\t17\\t15\\t7\\t15\\narabic\\t15\\t20\\t11\\t16\\t6\\nmath\\t11\\t17\\t9\\t1\\t6\\nphysics\\t6\\t2\\t10\\t9\\t2\\narabic\\t4\\t9\\t8\\t4\\t4\\ngeo\\t5\\t7\\t8\\t2\\t1\\ncomputing\\t16\\t5\\t15\\t19\\t7\\nsport\\t18\\t5\\t19\\t5\\t11\\nmath\\t17\\t13\\t6\\t17\\t17\\nphysics\\t17\\t4\\t10\\t15\\t12\\narabic\\t8\\t5\\t2\\t13\\t9\\nmath\\t12\\t12\\t11\\t20\\t14\\nphysics\\t17\\t14\\t0\\t19\\t20\\narabic\\t14\\t9\\t16\\t6\\t12\\ngeo\\t6\\t12\\t16\\t4\\t8\\ncomputing\\t19\\t0\\t19\\t14\\t4\\nsport\\t13\\t17\\t11\\t8\\t9\\nmath\\t10\\t11\\t5\\t7\\t0\\nphysics\\t0\\t6\\t19\\t19\\t12\\narabic\\t2\\t13\\t3\\t13\\t14\\nmath\\t12\\t0\\t1\\t11\\t9\\nphysics\\t1\\t6\\t13\\t3\\t16\\narabic\\t13\\t3\\t14\\t16\\t6\\ngeo\\t6\\t3\\t3\\t19\\t18\\ncomputing\\t10\\t15\\t8\\t3\\t8\\nsport\\t1\\t12\\t17\\t19\\t10\\nmath\\t8\\t18\\t9\\t10\\t1\\nphysics\\t18\\t6\\t3\\t3\\t20\\narabic\\t16\\t3\\t1\\t5\\t17\\nmath\\t18\\t20\\t15\\t8\\t2\\nphysics\\t3\\t5\\t15\\t9\\t12\\narabic\\t15\\t2\\t15\\t11\\t9\\ngeo\\t5\\t9\\t18\\t2\\t20\\ncomputing\\t17\\t9\\t0\\t7\\t8\\nsport\\t11\\t17\\t3\\t14\\t11\\nmath\\t15\\t1\\t9\\t5\\t13\\nphysics\\t3\\t0\\t9\\t17\\t7\\narabic\\t10\\t13\\t18\\t15\\t10\\nmath\\t2\\t16\\t1\\t18\\t11\\nphysics\\t15\\t10\\t17\\t18\\t4\\narabic\\t13\\t5\\t4\\t3\\t12\\ngeo\\t16\\t0\\t17\\t4\\t2\\ncomputing\\t3\\t14\\t6\\t2\\t19\\nsport\\t2\\t17\\t3\\t2\\t2\\nsport\\t9\\t4\\t12\\t19\\t18\\nmath\\t6\\t5\\t17\\t11\\t5\\nphysics\\t15\\t10\\t6\\t2\\t15\\narabic\\t7\\t8\\t13\\t11\\t4\\nmath\\t20\\t18\\t18\\t20\\t8\\nphysics\\t18\\t6\\t4\\t5\\t15\\narabic\\t7\\t14\\t5\\t12\\t16\\ngeo\\t16\\t13\\t9\\t8\\t15\\ncomputing\\t9\\t1\\t11\\t15\\t12\\nsport\\t7\\t8\\t19\\t6\\t8\\nmath\\t7\\t12\\t4\\t3\\t4\\nphysics\\t5\\t8\\t20\\t3\\t9\\narabic\\t14\\t20\\t3\\t15\\t6\\nmath\\t3\\t10\\t17\\t16\\t14\\nphysics\\t18\\t3\\t18\\t5\\t14\\narabic\\t8\\t10\\t3\\t20\\t20\\ngeo\\t18\\t2\\t7\\t16\\t11\\ncomputing\\t8\\t0\\t9\\t7\\t19\\nsport\\t12\\t12\\t8\\t18\\t19\\nmath\\t0\\t5\\t12\\t0\\t12\\nphysics\\t2\\t4\\t8\\t6\\t19\\narabic\\t15\\t2\\t9\\t15\\t16';

                self.boxPlotSeriesValue = ko.observableArray([]);
                self.boxPlotGroupsValue = ko.observableArray([]);

                /* toggle buttons */
                self.orientationValue = ko.observable('vertical');
                // function that split data into rows columns header and cols that contain data without the header
                self.splitData = function (inputData) {
                    var rows = inputData.split(/\\n/);

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
                self.parseDataSimply = function () {
                    self.splitData(self.simpleInputData);
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
                    self.boxPlotGroupsValue([]);
                };

                // function that return the column n of a matrix 
                self.getColumnValues = function (matrix, n) {
                    return matrix.map(function (value, index) {
                        return value[n];
                    });
                };


                //parse data by rows
                self.parseDataByRows = function () {
                    self.splitData(self.advancedInputData);
                    self.parseData(self.splitedData);
                };

                //parse data by cols
                self.parseDataByColumns = function () {
                    self.splitData(self.advancedInputData);
                    self.parseData(self.columns);
                };

                //parse data
                self.parseData = function (data) {

                    var rows = [];
                    self.series = [];
                    var seriesNames = [];
                    var groupsNames = [];
                    for (var i = 1; i < data.length; i++) {
                        if (data[i][0] && !rows[data[i][0]]) {
                            rows[data[i][0]] = [];

                            if (seriesNames.indexOf(data[i][0]) === -1) {
                                seriesNames.push(data[i][0]);
                            }
                        }
                        for (var j = 1; j < data[i].length; j++) {

                            //check if serie with of the line j exist
                            if (data[0][j] && !rows[data[i][0]][data[0][j]]) {
                                rows[data[i][0]][data[0][j]] = [];
                                if (groupsNames.indexOf(data[0][j]) === -1) {
                                    groupsNames.push(data[0][j]);
                                }
                            }

                            // check if the value is numeric
                            if (isNumber(data[i][j])) {
                                rows[data[i][0]][data[0][j]].push(parseFloat(data[i][j]));
                            }
                        }
                    }

                    seriesNames.sort();
                    groupsNames.sort();

                    for (var i = 0; i < seriesNames.length; i++) {
                        var serieBox = {"name": seriesNames[i], items: []};
                        var serie = rows[seriesNames[i]];

                        for (var j = 0; j < groupsNames.length; j++) {
                            if (serie[groupsNames[j]].length > 0) {
                                serieBox.items.push(self.getChartValues(serie[groupsNames[j]]));
                            } else {
                                serieBox.items.push({});
                            }
                        }
                        self.series.push(serieBox);

                    }

                    self.boxPlotSeriesValue(self.series);
                    self.boxPlotGroupsValue(groupsNames);


                };
                //return the low high q1 q2 and q3
                self.getChartValues = function (serie) {
                    var ret = {};
                    serie.sort(sortNumber);
                    var len = serie.length;
                    ret["low"] = serie[0];
                    ret["q2"] = getMedian(serie);
                    ret["high"] = serie.slice(-1)[0];

                    var lowerHalf = serie.slice(0, len / 2);
                    var upperHalf = serie.slice(-len / 2);

                    ret["q1"] = getMedian(lowerHalf);

                    ret["q3"] = getMedian(upperHalf);

                    return ret;
                };

                self.changeType = function () {
                    console.log("change", self.selectedItem);

                    $(".dataDiv").hide();
                    $("#" + self.selectedItem + "Div").show();
                }

                function getMedian(arr) {
                    var len = arr.length;

                    if (arr.length % 2 === 0) {
                        return (parseFloat(arr[len / 2 - 1]) + parseFloat(arr[len / 2])) / 2;
                    }

                    return arr[(len - 1) / 2];
                }

                function isNumber(n) {
                    return !isNaN(parseFloat(n)) && isFinite(n);
                }

                function sortNumber(a, b) {
                    return a - b;
                }

                self.parseDataSimply();
            }

            /*
             * Returns a constructor for the ViewModel so that the ViewModel is constructed
             * each time the view is displayed.  Return an instance of the ViewModel if
             * only one instance of the ViewModel is needed.
             */
            return new BoxPlotChartViewModel();
        }
);