import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();

        String[] domens = input.split("\\.");

        for (int i = domens.length-1; i >= 0; i--)
            System.out.println(domens[i]);
    }
}