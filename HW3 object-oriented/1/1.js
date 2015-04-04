// class Base
function Base(instanceVariable) {    
    this.instanceVariable = instanceVariable;
}

// instance method
Base.prototype.instanceMethod = function() {    
    console.log("This is from Base class instance-method, static-variable is: " + this.instanceVariable);
};

Base.staticVariable = 'Base';
// static method
Base.staticMethod = function() {  
    console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
};

// class Derived
function Derived(instanceVariable) {  
    this.instanceVariable = instanceVariable;
}

Derived.staticVariable = 'Derived';

// inherit
function extend(base, derived) {
    derived.prototype.instanceMethod = function() {  
        base.prototype.instanceMethod.call(this);
        console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
    };
    
    derived.staticMethod = function() {  
        base.staticMethod.call(this);
        console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
    };
    
}

extend(Base, Derived);

// Test 1
console.log("Test #1:");
example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();


// Test 2
console.log("Test #2:");
example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();
