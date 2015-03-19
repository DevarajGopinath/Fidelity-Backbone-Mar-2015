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
});
