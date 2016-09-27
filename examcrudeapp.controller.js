/**
* Created by authorName.
*/

class ExamcrudeappController {
  /*@ngInject*/
  constructor($filter, $scope ,$state,Restangular,User, $translate,$translatePartialLoader) {
  	  this.name = 'examcrudeapp';
      this.examcrudeappRest= Restangular.all('examcrudeapp');
      this.updateexam= Restangular.all('updateexam');
      
      this.examcrudeappdelRest= Restangular;
      this.examcrudeappObject = {};
      this.self = this;
      this.fetchAllExamcrudeapp();
      this.countryList = countryList;
      this.stateList = stateList;
      this.districtList = districtList;
      this.dataArrStateWiseDistricts = dataArrStateWiseDistricts;
      this.showme = true;
	 //this.db = pouchDB('ObjectName'); 

   this.CollegeFor=[
          {
            "_id":'1',
            "value":"Boys"
          },
          {
            "_id":'2',
            "value":"Girls"
          },
          {
            "_id":'3',
            "value":"Co-Education"
          }
        ]; 

        this.Documents = [
    { name: 'Property reg',    selected: true },
    { name: 'Affiliation',   selected: false },
    { name: 'Accrediation',     selected: true }
  ];

  }
	

  fetchAllExamcrudeapp(){
          
          this.examcrudeappRest.getList().then(function(examcrudeappList) {
             this.examcrudeappList= examcrudeappList;
          }.bind(this.self));
  }

  save(){
  		this.examcrudeappRest.post({"examcrudeapp":this.examcrudeappObject}).then(function(response) {
           this.fetchAllExamcrudeapp();
           this.examcrudeappObject = {};
         }.bind(this.self));
  }

  delete(val){
           /*example : var user = {_id:"a3",name:"aaaa", age:23;}*/
        this.examcrudeappdelRest.one("delExamcrudeapp").customPOST({"id":val}).then(function(response) {
             this.fetchAllExamcrudeapp();
           }.bind(this.self));
    
    
  }


  change(c) { 
      this.showme=false;
      this.examcrudeappObject = c;
       this.examcrudeappObject.AffiliationDate = new Date(c.AffiliationDate);
       

       }

       reset(){
        this.showme=true;
        this.examcrudeappObject = {};
       }

       update() {
        this.updateexam.post({ "examcrudeappObject": this.examcrudeappObject }).then(function(response) {
            console.log(response);
             this.fetchAllExamcrudeapp();
          this.examcrudeappObject = {};
        }.bind(this.self));

       
    }


  
}

export default ExamcrudeappController;

