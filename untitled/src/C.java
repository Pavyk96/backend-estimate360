import java.util.Scanner;

public class C {
    public void code() {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.next();

        try {
            int number10 = Integer.parseInt(input);
            if (number10 < 0) {
                System.out.println("Неверный ввод");
            } else {
                var number2 = Integer.toBinaryString(number10);
                var number8 = Integer.toOctalString(number10);
                var number16 = Integer.toHexString(number10);
                System.out.println(number2 +", "+ number8 +", "+ number16);
            }
        } catch (NumberFormatException e){
            System.out.println("Неверный ввод");
        }
    }
}
