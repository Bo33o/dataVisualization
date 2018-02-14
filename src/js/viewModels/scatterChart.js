/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Simple charts view model
 * The data visualization based on column : first numeric column are the x of the first point nd the second numeric column are the y of the first point
 * the  third numeric column are the x of the second point and the forth numeric column are the y of the second point and so on ...
 * the alphanumeric values are considered as serie name joined by " " 
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojchart', 'ojs/ojinputtext', 'ojs/ojlabel', 'ojs/ojnavigationlist'],
        function (oj, ko, $) {

            function ScatterChartViewModel() {
                var self = this;
                self.series = [];
                self.groups = [];
                self.columns = [];
                this.selectedType = "simpleScatter";

                this.scatterSeriesValue = ko.observableArray(self.series);
                this.scatterGroupsValue = ko.observableArray(self.groups);

                // the default data
                self.simpleInputData = 'serie name\\tx1\\ty1\\tx2\\ty2\\tx3\\ty3\\tx4\\ty4\\tx5\\ty5\\tx6\\ty6\\tx7\\ty7\\nserie 1\\t19\\t90\\t73\\t32\\t24\\t54\\t41\\t53\\t42\\t19\\t49\\t8\\t82\\t84\\nserie 2\\t100\\t99\\t27\\t70\\t77\\t94\\t57\\t34\\t21\\t61\\t65\\t22\\t98\\t73\\nserie 3\\t99\\t87\\t78\\t49\\t69\\t84\\t38\\t31\\t88\\t67\\t45\\t8\\t17\\t74\\nserie 4\\t41\\t86\\t25\\t54\\t10\\t32\\t33\\t21\\t23\\t64\\t66\\t48\\t96\\t0\\nserie 5\\t98\\t56\\t85\\t48\\t26\\t12\\t54\\t12\\t8\\t9\\t3\\t83\\t32\\t22';
//                self.advancedInputData = 'Temperature ّC\\tIce Cream Sales\\n14,2ّ\\t215\\n16,4ّ\\t325\\n11,9ّ\\t185\\n15,2ّ\\t332\\n18,5ّ\\t406\\n22,1ّ\\t522\\n19,4ّ\\t412\\n25,1ّ\\t614\\n23,4ّ\\t544\\n18,1ّ\\t421\\n22,6ّ\\t445\\n17,2ّ\\t408';
                self.advancedInputData = 'Course\\tSchool 1\\tSchool 2\\tSchool 3\\tSchool 4\\tSchool 5\\nmath\\t15\\t8\\t1\\t7\\t1\\nphysics\\t1\\t10\\t10\\t2\\t11\\narabic\\t0\\t14\\t18\\t3\\t17\\ngeo\\t19\\t10\\t6\\t8\\t3\\ncomputing\\t11\\t7\\t11\\t9\\t19\\nsport\\t3\\t3\\t16\\t17\\t16\\nmath\\t11\\t11\\t10\\t2\\t17\\nphysics\\t3\\t5\\t9\\t7\\t17\\narabic\\t3\\t0\\t17\\t17\\t14\\nmath\\t8\\t0\\t11\\t14\\t9\\nphysics\\t8\\t11\\t6\\t7\\t12\\narabic\\t11\\t20\\t6\\t10\\t11\\ngeo\\t10\\t2\\t14\\t20\\t6\\ncomputing\\t17\\t2\\t1\\t12\\t18';
//                self.advancedInputData = 'Course\\tSchoolA\\tSchoolB\\tSchoolC\\nmath\\t18\\t20\\t12\\nphysics\\t12\\t12\\t14\\narabic\\t11\\t11\\t11\\ngeo\\t10\\t19\\t15';

                // function that return the column n of a matrix 
                self.getColumnValues = function (matrix, n) {
                    return matrix.map(function (value, index) {
                        return value[n];
                    });
                };

                self.lineTypeOptions = [
                    {id: 'none', label: 'none'},
                    {id: 'straight', label: 'straight'},
                    {id: 'curved', label: 'curved'},
                    {id: 'stepped', label: 'stepped'},
                    {id: 'segmented', label: 'segmented'},
                ];
                self.lineTypeValue = ko.observable('none');

                // function that split data into rows columns header 
                self.splitData = function (inputData) {
                    var rows = inputData.split(/\\n/);

                    self.splitedData = [];
                    self.columns = [];

                    self.header = [];

                    for (var i = 0; i < rows.length; i++) {
                        self.splitedData[i] = rows[i].split(/\\t/);
                    }

                    if (self.splitedData.length > 0) {
                        self.header = self.splitedData[0];
                        var matrix = self.splitedData;
                        for (var i = 0; i < self.header.length; i++) {
                            self.columns[i] = self.getColumnValues(matrix, i);
                        }
                    }
                };

                //check if variable is numeric
                function isNumber(n) {
                    return !isNaN(parseFloat(n)) && isFinite(n);
                }
                ;

                //function that parse that and search for x, y of the points
                self.parseDataSimply = function () {
                    self.splitData(self.simpleInputData);
                    self.series = [];
                    self.groups = [];

                    for (var i = 1; i < self.splitedData.length; i++) {
                        var serieLabel = "";
                        var seriePoints = [];
                        var point = {};
                        for (var j = 0; j < self.splitedData[i].length; j++) {

                            if (isNumber(self.splitedData[i][j])) {
                                if (!point.x) {
                                    point.x = self.splitedData[i][j];
                                } else {
                                    point.y = self.splitedData[i][j];
                                }
                            } else {
                                serieLabel += self.splitedData[i][j] + " ";
                            }

                            if (point.y) {
                                seriePoints.push(point);
                                point = {};
                            }
                        }


                        self.series.push({name: serieLabel, items: seriePoints});
                    }
                    self.scatterSeriesValue(self.series);
                    self.scatterGroupsValue([]);
                };

                self.parseAdvacedData = function (data) {
                    var series = [];
                    var groups = [];

                    for (var i = 1; i < data.length; i++) {
                        var scatterSerie = {name: "", items: []};

                        if (data[i][0]) {
                            scatterSerie["name"] = data[i][0];
                        }

                        for (var j = 1; j < data[i].length; j++) {
                            if (i === 1) {
                                groups.push(data[0][j]);
                            }
                            scatterSerie.items.push({x: j, y: data[i][j]})
                        }
                        series.push(scatterSerie);

                    }

                    return [series, groups];

                }

                self.parseDataByRows = function () {
                    self.splitData(self.advancedInputData);
                    var ret = self.parseAdvacedData(self.splitedData);
                    self.series = ret[0];
                    self.groups = ret[1];
                    //                    console.log(self.series);
                    console.log(self.groups);
                    self.scatterSeriesValue(self.series);
                    self.scatterGroupsValue(self.groups);
                };

                self.parseDataByColumns = function () {
                    self.splitData(self.advancedInputData);
                    var ret = self.parseAdvacedData(self.columns);
                    self.series = ret[0];
                    self.groups = ret[1];
//                    console.log(self.series);
                    console.log(self.groups);
                    self.scatterSeriesValue(self.series);
                    self.scatterGroupsValue(self.groups);
                };

                self.changeType = function () {
                    $(".dataDiv").hide();
                    $("#" + self.selectedType + "Div").show();
                };

                self.parseDataSimply();
            }

            /*
             * Returns a constructor for the ViewModel so that the ViewModel is constructed
             * each time the view is displayed.  Return an instance of the ViewModel if
             * only one instance of the ViewModel is needed.
             */
            return new ScatterChartViewModel();
        }
);
