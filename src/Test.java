import java.io.*;

public class Test extends Thread {
    String script_name;
    String input;

    public Test(String script_name, String input) {
        this.input = input;
        this.script_name = script_name;
    }

    public void test() {
        ProcessBuilder pb = new ProcessBuilder("python", this.script_name);

        try {
            Process p = pb.start();

            OutputStream stdin = p.getOutputStream();
            InputStream stdout = p.getInputStream();

            BufferedReader reader = new BufferedReader(new InputStreamReader(stdout));
            BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(stdin));

            writer.write(this.input);
            writer.newLine();
            writer.flush();
            p.waitFor();
            String read;
            while ((read = reader.readLine()) != null) {
                System.out.println(read);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void run() {
        test();
    }
}