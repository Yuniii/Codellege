import java.util.*;
import java.io.*;
import java.net.*;
import java.util.regex.*;

public class GetName {
    public static void main(String[] args) throws IOException {
		String name = "", name1 = "", name2 = "";		
		FileReader fr1 = new FileReader(args[0]);
        BufferedReader br1 = new BufferedReader(fr1);
		while (br1.ready()) {
            String line = "";
            line = br1.readLine();
			// get the class name
            if (line.contains("public class ")) {
				Pattern p1 = Pattern.compile("class\\s+(.*?)\\s+\\{");
				Pattern p2 = Pattern.compile("class\\s+(.*?)\\{");
				Matcher m1 = p1.matcher(line);
				Matcher m2 = p2.matcher(line);
				if (m1.find()) {
				  name1 = m1.group(1);
				}
				if (m2.find()) {
				  name2 = m2.group(1);
				}
				if (name1.length() < name2.length() && name1.length() != 0) {
					name = name1;
				} else {
					name = name2;
				}
				break;
            }
        }
        fr1.close();

		// output the class name as a file named 'name'
		FileWriter fw = new FileWriter("name");
        fw.write(name);
        fw.flush();
        fw.close();

    }
}
