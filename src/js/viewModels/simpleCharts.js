/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */

/*
 * Simple charts view model
 * The data visualization based on column : the alphanumeric columns are considered as serie name joined by " " 
 * And the numeric columns are considered as serie values
 * the group names are the header of the input data
 */

define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojselectcombobox', 'ojs/ojchart', 'ojs/ojinputtext', 
    'ojs/ojlabel'],
        function (oj, ko, $) {

            function SimpleChartsViewModel() {
                var self = this;
                //initialized the default chart type
                self.chartType = ko.observable("bar");
                
                //header of data
                self.header = [];
                
                //header with id
                self.mixedHeader = [];
                
                self.series = [];
                self.groups = [];
                
                // matrix to store splited Data
                self.splitedData = [];
                
                //matrix to store data as columns
                self.columns = [];
                
                //chart series
                self.barSeries = ko.observableArray([]);
                //chart groups
                self.barGroups = ko.observableArray([]);

                //array to store hidden groups
                self.hiddenCategories = ko.observableArray([]);
                // string to store input string
                self.inputData = 'prenom\\tMath\\tPhysics\\tProgramming\\tnom\\tjava\\nbadr\\t2\\t3\\t4\\tezzir\\t10\\nwafae\\t8\\t7\\t6\\tabder\\t2';
                
                // variable to store coordinate System ( cartesian / polar )
                self.coordinateSystem = ko.observable('cartesian');
                
                //array to store selected items
                self.selectedItems = [];
                
                // group detection (automatic/custom)
                self.groupDetection = ko.observable("automatic");

                // variable to store selected custom groups
                self.selectedGroups = [];
                
                // function that return the column n of a matrix 
                self.getColumnValues = function (matrix, n) {
                    return matrix.map(function (value, index) {
                        return value[n];
                    });
                };
                
                // function that split data into rows columns header and mixedHeader
                self.splitData = function () {
                    var rows = self.inputData.split(/\\n/);

                    self.splitedData = [];
                    self.series = [];
                    self.header = [];
                    self.mixedHeader = [];

                    for (var i = 0; i < rows.length; i++) {
                        self.splitedData[i] = rows[i].split(/\\t/);
                    }

                    if (self.splitedData.length > 0) {
                        self.header = self.splitedData[0];
                        var matrix = self.splitedData;
                        for (var i = 0; i < self.header.length; i++) {
                            self.mixedHeader.push({id: i + 1, label: self.header[i]});
                            self.columns[i] = self.getColumnValues(matrix, i);
                        }
                    }
                };
                
                //function that select groups automatically 
                self.getGroups = function () {

                    self.series = [];
                    self.groups = [];
                    
                    for (var i = 0; i < self.columns.length; i++) {
                        var serieLabel = "";
                        var serieItem = [];
                        for (var j = 0; j < self.columns[i].length; j++) {

                            if (isNumber(self.columns[i][j])) {
                                serieItem.push(self.columns[i][j]);
                            } else {
                                if (j === 0) {
                                    serieLabel += self.columns[i][j] + " ";
                                }

                                if (j > 0) {
                                    if (self.groups[j - 1]) {
                                        self.groups[j - 1] += " " + self.columns[i][j];
                                    } else {
                                        self.groups[j - 1] = self.columns[i][j];
                                    }
                                }

                            }
                        }
                        if (serieItem.length > 0) {
                            //if there is a items, add the serie
                            self.series.push({name: serieLabel, items: serieItem});
                        }
                    }
                    //set chart series and groups
                    self.barSeries(self.series);
                    self.barGroups(self.groups);
                };

                // submit data event
                self.parseData = function () {
                    self.splitData(self.inputData);
                    self.getGroups();
                };
                
                self.parseData()

                //check if variable is numeric
                function isNumber(n) {
                    return !isNaN(parseFloat(n)) && isFinite(n);
                };
                
                //submit custom groups
                self.submitGroups = function (event) {
                    for (var i = 0; i < self.selectedGroups.length; i++) {
                        self.selectedGroups[i] = self.selectedGroups[i] - 1;
                    }

                    self.customGroups();
                };
                
                //function that custom the groups to be the selected items and the non selected items are series
                self.customGroups = function () {
                    self.series = [];
                    self.groups = [];

                    for (var i = 0; i < self.columns.length; i++) {
                        var serieLabel = "";
                        var serieItem = [];
                        for (var j = 0; j < self.columns[i].length; j++) {
                            if (self.selectedGroups.indexOf(i) === -1 && isNumber(self.columns[i][j])) {
                                serieItem.push(self.columns[i][j]);
                            } else if (self.selectedGroups.indexOf(i) >= 0) {
                                if (j > 0) {
                                    if (self.groups[j - 1]) {
                                        self.groups[j - 1] += " " + self.columns[i][j];
                                    } else {
                                        self.groups[j - 1] = self.columns[i][j];
                                    }
                                }
                            } else if (j === 0) {
                                serieLabel += self.columns[i][j] + " ";
                            }
                        }

                        if (self.selectedGroups.indexOf(i) === -1 && serieItem.length > 0) {
                            self.series.push({name: serieLabel, items: serieItem});
                        }
                    }
                    self.barSeries(self.series);
                    self.barGroups(self.groups);
                };
            }
            
            self.selectionListener =function(){
                
            }

            /*
             * Returns a constructor for the ViewModel so that the ViewModel is constructed
             * each time the view is displayed.  Return an instance of the ViewModel if
             * only one instance of the ViewModel is needed.
             */
            return new SimpleChartsViewModel();
        }
);
