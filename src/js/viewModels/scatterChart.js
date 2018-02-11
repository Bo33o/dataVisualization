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
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojchart', 'ojs/ojinputtext', 'ojs/ojlabel'],
        function (oj, ko, $) {

            function ScatterChartViewModel() {
                var self = this;
                self.series = [];
                self.columns = [];

                this.scatterSeriesValue = ko.observableArray(self.series);

                // the default data
                self.inputData = 'serie name\\tx1\\ty1\\tx2\\ty2\\tx3\\ty3\\tx4\\ty4\\tx5\\ty5\\tx6\\ty6\\tx7\\ty7\\nserie 1\\t19\\t90\\t73\\t32\\t24\\t54\\t41\\t53\\t42\\t19\\t49\\t8\\t82\\t84\\nserie 2\\t100\\t99\\t27\\t70\\t77\\t94\\t57\\t34\\t21\\t61\\t65\\t22\\t98\\t73\\nserie 3\\t99\\t87\\t78\\t49\\t69\\t84\\t38\\t31\\t88\\t67\\t45\\t8\\t17\\t74\\nserie 4\\t41\\t86\\t25\\t54\\t10\\t32\\t33\\t21\\t23\\t64\\t66\\t48\\t96\\t0\\nserie 5\\t98\\t56\\t85\\t48\\t26\\t12\\t54\\t12\\t8\\t9\\t3\\t83\\t32\\t22';

                // function that return the column n of a matrix 
                self.getColumnValues = function (matrix, n) {
                    return matrix.map(function (value, index) {
                        return value[n];
                    });
                };

                // function that split data into rows columns header 
                self.splitData = function () {
                    var rows = self.inputData.split(/\\n/);

                    self.splitedData = [];

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
                self.parseData = function () {
                    self.series = [];

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

                        self.scatterSeriesValue(self.series);
                    }
                };

                self.splitData();
                self.parseData();
            }

            /*
             * Returns a constructor for the ViewModel so that the ViewModel is constructed
             * each time the view is displayed.  Return an instance of the ViewModel if
             * only one instance of the ViewModel is needed.
             */
            return new ScatterChartViewModel();
        }
);
