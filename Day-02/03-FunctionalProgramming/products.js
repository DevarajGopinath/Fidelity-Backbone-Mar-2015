var products = [
    {id : 5, name : "Pen", cost : 50, units : 60, category : 1},
    {id : 9, name : "Hen", cost : 80, units : 40, category : 2},
    {id : 8, name : "Den", cost : 70, units : 90, category : 1},
    {id : 3, name : "Zen", cost : 40, units : 70, category : 2},
    {id : 4, name : "Ken", cost : 60, units : 30, category : 1},
    {id : 2, name : "Len", cost : 90, units : 20, category : 2}
]

function print(title, fn){
    console.group(title);
    fn();
    console.groupEnd();
}

print("Default list", function(){
    console.table(products);
});

print("Sort", function(){
    print("Default [products by id]", function(){
        function sort(){
            for(var i=0; i< products.length-1; i++)
                for(var j=i + 1; j<products.length; j++){
                    if (products[i].id > products[j].id){
                        var temp = products[i];
                        products[i] = products[j];
                        products[j] = temp;
                    }
                }
        }
        sort();
        console.table(products);
    });
    print("Any list by any attribute", function(){
        function sort(list, attrName){
            for(var i=0; i< list.length-1; i++)
                for(var j=i + 1; j<list.length; j++){
                    if (list[i][attrName] > list[j][attrName]){
                        var temp = list[i];
                        list[i] = list[j];
                        list[j] = temp;
                    }
                }
        }
        console.log("Products By cost");
        sort(products, "cost");
        console.table(products);

        console.log("Products By units");
        sort(products, "units");
        console.table(products);
    });
     print("Any list by any logic", function(){
        function sort(list, comparerFn){
            for(var i=0; i< list.length-1; i++)
                for(var j=i + 1; j<list.length; j++){
                    if (comparerFn(list[i], list[j]) > 0){
                        var temp = list[i];
                        list[i] = list[j];
                        list[j] = temp;
                    }
                }
        }
         function productComparerByStockValue (p1, p2){
             var p1StockValue = p1.cost * p1.units,
                 p2StockValue = p2.cost * p2.units;

             if (p1StockValue < p2StockValue) return -1;
             if (p1StockValue === p2StockValue) return 0;
             return 1;
         }
        console.log("Products By Stock Value [units * cost]");
        sort(products, productComparerByStockValue);
        console.table(products);
    });
});

print("Filter", function(){
    function filter(list, criteriaFn){
        var result = [];
        for(var i=0; i<list.length; i++)
            if (criteriaFn(list[i]))
                result.push(list[i]);
        return result;
    }
    function inverseCriteria(criteriaFn){
        return function(p){
            return !criteriaFn(p);
        }
    }
    var costlyProductCriteria = function(product){
            return product.cost > 50;
        }
    /*var affordableProductCriteria = function(p){
        return !costlyProductCriteria(p);
    }*/
    var affordableProductCriteria = inverseCriteria(costlyProductCriteria)

    print("Costly products [cost > 50]", function(){

        var allCostlyProducts = filter(products, costlyProductCriteria);
        console.table(allCostlyProducts);
    });

    print("Affordable products [cost <= 50]", function(){

        var affordableProducts = filter(products, affordableProductCriteria);
        console.table(affordableProducts);
    });

});

print("Every", function(){
    function every(list, criteriaFn){
        for(var i=0; i<list.length; i++)
            if (!criteriaFn(list[i])) return false;
        return true;
    }
    var costlyProductCriteria = function(p){
        return p.cost > 50;
    }
    var areAllProductsCostly = every(products, costlyProductCriteria);
    console.log("Are all products costly?", areAllProductsCostly);
});

print("Any", function(){
    function any(list, criteriaFn){
        for(var i=0; i<list.length; i++)
            if (criteriaFn(list[i])) return true;
        return false;
    }
    var costlyProductCriteria = function(p){
        return p.cost > 50;
    }
    var areAnyProductsCostly = any(products, costlyProductCriteria);
    console.log("Are there any costly products?", areAnyProductsCostly);
});

print("Min", function(){
    function min(list, valueSelectorFn){
        var result = valueSelectorFn(list[0]);
        for(var i=1; i<list.length; i++){
             var currentValue = valueSelectorFn(list[i]);
            if (currentValue < result)
                result = currentValue;
        }
        return result;
    }
    function costValueSelectorFn(p) { return p.cost; };
    var minCost = min(products, costValueSelectorFn);
    console.log("Min cost = ", minCost);

    function unitsValueSelectorFn(p) { return p.units; };
    var minUnits = min(products, unitsValueSelectorFn);
    console.log("Min units = ", minUnits);
});

/*Max*/

print("Sum", function(){
    function sum(list, valueSelectorFn){
        var result = 0;
        for(var i=0; i<list.length; i++)
            result += valueSelectorFn(list[i]);
        return result;
    }
    function unitsValueSelectorFn(p) { return p.units; };
    var sumOfUnits = sum(products, unitsValueSelectorFn);
    console.log("Sum of units = ", sumOfUnits);

    function stockValueSelectorFn(p){ return p.units * p.cost; };
    var totalStockValue = sum(products, stockValueSelectorFn);
    console.log("Total Stock value = ", totalStockValue);
});

print("Aggregate", function(){
    function aggregate(list, aggregator, seed){
        var result = seed;
        for(var i=0; i<list.length; i++){
            result = aggregator(result, list[i]);
        }
        return result;
    }

    function unitsSumAggregator(seed, product){
        return seed + product.units;
    }
    var sumOfUnits = aggregate(products, unitsSumAggregator, 0);
    console.log("Sum of units = ", sumOfUnits);
});

print("GroupBy", function(){
    function groupBy(list, keySelectorFn){
        var result = { };
        for(var i=0; i<list.length;i++){
            var key = keySelectorFn(list[i]);
            if (typeof result[key] === "undefined")
                result[key] = [];
            result[key].push(list[i]);
        }
        return result;
    }
    print("By Category", function(){
        var categoryKeySelectorFn = function(product){ return product.category; }
        var productsGroupedByCategory = groupBy(products, categoryKeySelectorFn);
        for(var key in productsGroupedByCategory){
            print("Key = " + key, function(){
                console.table(productsGroupedByCategory[key]);
            });
        }
    });

    print("By Cost", function(){
        var costKeySelectorFn = function(p){
            return p.cost > 50 ? "costly" : "affordable";
        }
        var productsGroupedByCost = groupBy(products, costKeySelectorFn);
        for(var key in productsGroupedByCost){
            print("Key = " + key, function(){
                console.table(productsGroupedByCost[key]);
            });
        }
    });

});
/*
every
any
min
max
sum
aggregate
groupBy
*/
