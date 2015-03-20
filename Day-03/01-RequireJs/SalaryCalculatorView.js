define(['jquery', 'handlebars', 'text!calculatorTemplate.html'], function($, Handlebars, calculatorTemplate){

     /*View*/
    function SalaryCalculatorView(calculator){

        var $root = this.$root = $("<div></div>");

        this.initialize = function(){
            /*UI Interaction events*/
            $root.on("change", "#txtBasic", function(){
                calculator.set('basic', parseInt(this.value,0));
            });
            $root.on("change", "#txtHra", function(){
                calculator.set('hra', parseInt(this.value,0));
            });
            $root.on("change", "#txtDa", function(){
                calculator.set('da', parseInt(this.value,0));
            });
            $root.on("change", "#rangeTax", function(){
                calculator.set('tax', parseInt(this.value,0));
            });

            $root.on("click", "#btnCalculate", function(){
                calculator.calculate();
            });
            /* ******************************** */

            /*Model change events*/
            var self = this;
            calculator.addListener('salary', function(){
               self.render();
            });
            calculator.addListener("basic", function(){
                self.render();
            });
            calculator.addListener("hra", function(){
                self.render();
            });
            calculator.addListener("da", function(){
                self.render();
            });
            calculator.addListener("tax", function(){
                self.render();
            });
        }

        this.render = function(){
            var templateFn = Handlebars.compile(calculatorTemplate);
            var generatedHTML = templateFn(calculator.toJSON());
            this.$root.html(generatedHTML);
        }
    }
    /* ****************************** */
    return SalaryCalculatorView;
});
