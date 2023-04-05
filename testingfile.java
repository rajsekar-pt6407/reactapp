package com.restAPI.DemoRest;
class testingClass{
    public int returnMethodCount(int count){
        if(count==1){
            System.out.println("Return method count")
            if(true){
                System.out.println(count);
                return 1;
            }
            else if(count==2){
                return 2;
            }
            else if(count==3){
                return 3;
            }
            else if(count==4){
                return 4;
            }
            else{
                return -9;
            }
        }
     return 0;
    }
    public static void main(String[] param){
        System.out.println("Testing Class");
        testingClass test = new testingClass();
        test.returnMethodCount(1);
    }
}