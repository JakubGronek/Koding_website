package com.project.utility;

import java.io.*;

public class Test extends Thread {
    String script_name;
    String input;
    private volatile String output;

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
            try {
                read = reader.readLine();
                System.out.println(read+" "+read.length());
                this.output = read;
            }catch (Exception e){
                e.printStackTrace();
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void run() {
        test();
    }

    public String getOutput(){
        return output;
    }
}
