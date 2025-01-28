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
        ProcessBuilder pb = new ProcessBuilder("/bin/bash", "-c",
                "docker", "run",
                "--rm",
                "-v $(pwd)/temp/"+script_name+":/root/app/script.py",
                "python:latest", "python /root/app/script.py");

        try {
            Process p = pb.start();

            OutputStream stdin = p.getOutputStream();
            InputStream stdout = p.getInputStream();
            InputStream stderr = p.getErrorStream();

            BufferedReader errorReader = new BufferedReader(new InputStreamReader(stderr));
            BufferedReader reader = new BufferedReader(new InputStreamReader(stdout));
            BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(stdin));

            writer.write(this.input);
            writer.newLine();
            writer.flush();
            p.waitFor();

            String output = "";
            String read;

            String err = "";

            try {
                while ((read = reader.readLine()) != null) {
                    output += read + "\n";
                }

                while ((read = errorReader.readLine()) != null) {
                    output += read + "\n";
                }

                this.output = output.trim();
            } catch (IOException e) {
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
