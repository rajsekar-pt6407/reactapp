package com.restAPI.DemoRest;

import java.lang.reflect.Constructor;

import java.util.Random;

class sampletesting {
    Random random;

    public sampletesting() {
        random = new Random();
    }

    public int statementreturn(boolean validate) {
        int number = random.nextInt(10);
        if (validate) {
            if (number==1) {
                return 1;
            } else if (number==2) {
                return 2;
            } else if (number==3) {
                return 3;
            } else if (number==4) {
                return 4;
            } else if (number==5) {
                return 5;
            } else if (number==6) {
                return 6;
            } else if (number==7) {
                return 7;
            } else if (number==8) {
                return 8;
            } else if (number==9) {
                return 9;
            }
        }
        return 0;
    }

    public static void main(String[] args) {
        sampletesting sample=new sampletesting();
         System.out.println(sample.statementreturn(true));
    }
}