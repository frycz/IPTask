/*
 * autor: Adam Sawicki
 * adamsawicki89@gmail.com
 * 02.08.2015
 */

var easyPack = easyPack || {};

var independentHelperService = (function(){
    
    return {
        getRequest: function(url,callback)
        {
            var xmlHttp = new XMLHttpRequest();
            
            xmlHttp.onreadystatechange=function()
            {
                if (xmlHttp.readyState==4 && xmlHttp.status==200)
                {
                    if(typeof callback === 'function'){
                        callback(xmlHttp.responseText);
                    }
                }
            }
            
            xmlHttp.open( "GET", url, true );
            xmlHttp.send( null );
        },
        log: function(text){
            
            // IE closed console protection
            if(console){
                if(console.log){
                    console.log(text);
                }
            }
        },
        getSelectElement: function(options){
            
            /*
             * options array: 
             *  var options = [
                    {value: "value1", text: "text 1"},
                    {value: "value2", text: "text 2"},
                    ...
                ];
             */
            
            var selectElement = document.createElement('select');
            var option = null;
            var optionsNumber = options.length;

            for (var i = 0; i < optionsNumber; i++) {
                
                option = document.createElement('option');
                
                option.setAttribute('value', options[i].value);
                option.appendChild(document.createTextNode(options[i].text));
                
                selectElement.appendChild(option);
            }
            
            return selectElement;
        },
        cache: {
            set: function(name,data){
                
                var jsonData = JSON.stringify(data);
                
                if(localStorage){
                    localStorage.setItem(name,jsonData);
                }
                // too many bytes to use cookies (only 4093 bytes to use)
            },
            get: function(name){
                
                var data = null;
                var jsonData = null;
                
                if(localStorage){
                    jsonData = localStorage.getItem(name);
                }
                
                data = JSON.parse(jsonData);
                return data;
            }
        }
    }
})()

easyPack.listWidget = (function(independentHelperService){
    
    if(independentHelperService === undefined){
        throw 'independentHelperService not defined';
    }
    
    function getOptionsArray(easypackResponseObject){
        
        var options = [];
        var optionsNumber = easypackResponseObject.total_count;
        
        if(typeof easypackResponseObject !== 'object'){
            throw 'easypackResponseObject is not an object';
        }
        if(isNaN(optionsNumber)){
            throw 'wrong easypackResponseObject structure';
        }
        
        if(easypackResponseObject._embedded){
                if(easypackResponseObject._embedded.machines.constructor === Array){
                    
                    var machines = easypackResponseObject._embedded.machines;
                    
                    for(var i = 0; i < optionsNumber; i++){
                        options.push({
                            /*
                             
                             "...W efekcie czego powinna pojawiæ siê lista rozwijalna z nazwami Paczkomatów (atrybut name
                                obiektu w kolekcji machines)."
                        
                                Nie znalaz³em atrybutu name obiektu w kolekcji machines
                        
                             */
                            text: machines[i].address_str,
                            value: machines[i].id
                        })
                    }
                } else {
                    throw 'wrong easypackResponseObject structure';
                }
            } else {
                throw 'wrong easypackResponseObject structure';
            }
            
            return options;
    }

    function buildSelectElement(domElement,selectOptions){
        
        domElement.innerHTML = '';

        var selectElement = independentHelperService.getSelectElement(selectOptions);
        domElement.appendChild(selectElement);
    }
    
    independentHelperService.log('SDK initialize');
        
    return function(domElementId){
    
        var domElement = document.getElementById(domElementId);
    
        if(domElement == null){
            throw 'can not find dom element with ' + domElementId + ' id';
        }
    
        domElement.innerHTML = 'Wczytywanie...';

        var dataFromCache = independentHelperService.cache.get('easypackList');
        if(dataFromCache === null){
    
            independentHelperService.getRequest('https://api-pl.easypack24.net/v4/machines?type=0',function(responseText){

                var responseObject = JSON.parse(responseText);

                var options = getOptionsArray(responseObject);
                
                buildSelectElement(domElement,options);
            
                independentHelperService.cache.set('easypackList',options);
                
            });  
            
        } else {
            buildSelectElement(domElement,dataFromCache);
        }
        
        independentHelperService.log('Widget initialize');
    }
    
})(independentHelperService);



