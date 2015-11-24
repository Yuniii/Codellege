import java.util.*;
import java.io.*;
import java.net.*;
import java.util.regex.*;

public class GetName {
    public static void main(String[] args) throws IOException {
		String name = "";		
		FileReader fr1 = new FileReader(args[0]);
        BufferedReader br1 = new BufferedReader(fr1);
		while (br1.ready()) {
            String line = "";
            line = br1.readLine();
			// get the class name
            if (line.contains("public class ")) {
				Pattern p = Pattern.compile("class (.*?) \\{");
				Matcher m = p.matcher(line);
				if (m.find()) {
				  name = m.group(1);
				}
				break;
            } else {
				name = "Main";		
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
