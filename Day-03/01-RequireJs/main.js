require(['SalaryCalculator','SalaryCalculatorView','jquery'], function(SalaryCalculator, SalaryCalculatorView, $){
    $(function(){
        var calculator = new SalaryCalculator({
            basic : 0,
            hra : 0,
            da : 0,
            tax : 0,
            salary : 0
        });
        var view1 = new SalaryCalculatorView(calculator);
        view1.initialize();
        view1.render();
        view1.$root.appendTo(document.body);
    });
});
