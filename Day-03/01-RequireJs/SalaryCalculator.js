define([],function(){

/*Model*/
    function SalaryCalculator(defaults){

        var _data = defaults || {};

        this.get = function(attrName){
            return _data[attrName];
        };
        this.set = function(attrName, value){
            _data[attrName] = value;
            triggerEvents(attrName);
        };

        var _events = {  };

        this.addListener = function(attrName, listenerFn){
            if (typeof _events[attrName] === "undefined")
                _events[attrName] = [];
            _events[attrName].push( listenerFn);
        };

        this.removeEventListener = function(attrName, listenerFn){
            //Fill in the blanks
        };

        var triggerEvents = (function (attrName){
            var listenerFns = _events[attrName] || [];
            var self = this;
            listenerFns.forEach(function (listenerFn){
                        listenerFn.call(self);
            });
        }).bind(this);

        this.toJSON = function(){
            var result = {};
            for(var key in _data)
                result[key] = _data[key];
            return result;
        }

    }
    SalaryCalculator.prototype.calculate = function(){
        var gross = this.get('basic') + this.get('hra') + this.get('da');
        var net = gross * ((100-this.get('tax'))/100);
        this.set('salary', net);
    }
    /* ****************************** */

    return SalaryCalculator;
});
