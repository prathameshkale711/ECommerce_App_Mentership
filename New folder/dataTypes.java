

import java.util.Scanner;

public class dataTypes{
public static void main(String[] args) {
    Scanner sc =new Scanner(System.in);
    System.out.println("Enter value of intger  :");
    int a=sc.nextInt();
    System.out.println("Enter value of double:");
    double d=sc.nextDouble();
    System.out.println("enter value of char :");
    char c=sc.next().charAt(0);
    System.out.println("write here word :");
    String str=sc.next();


   

    sc.close();
    System.out.println("Enter here all values :");
    System.out.println("intger:"+a);
    System.out.println("double :"+d);
    System.out.println("char :"+c);
    System.out.println("string :"+str);
    

    
    
}
}