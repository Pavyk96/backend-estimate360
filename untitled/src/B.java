import java.text.DecimalFormat;
import java.util.Scanner;

public class B {
    public void square() {
        Scanner scanner = new Scanner(System.in);

        double a = scanner.nextDouble();

        double perimeter = 4 * a;
        double area = a * a;
        double diagonal = Math.sqrt(2) * a;

        String formattedPerimeter = String.format("%.2f", perimeter);
        String formattedArea = String.format("%.2f", area);
        String formattedDiagonal = String.format("%.2f", diagonal);

        System.out.println(formattedPerimeter + ". " + formattedArea + ". " + formattedDiagonal);
    }
    public static void main(String[] args) {
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
