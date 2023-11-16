package com.project;

import com.microsoft.playwright.*;
import com.microsoft.playwright.options.AriaRole;
import org.junit.jupiter.api.*;
import java.nio.file.Paths;
import java.util.regex.Pattern;
import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

public class Test{
    static Playwright playwright;
    static Browser browser;
    static Page page;

    @BeforeAll
    public static void prepare(){
        playwright = Playwright.create();
        browser = playwright.firefox().launch(new BrowserType.LaunchOptions().setHeadless(false).setSlowMo(200));
        page = browser.newPage();
    }
    @org.junit.jupiter.api.Test
    public void login(){
        page.navigate("http://localhost:8080/");
        page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Zaloguj się lub zarejestruj")).click();
        page.locator("input[name=\"username\"]").click();
        page.locator("input[name=\"username\"]").fill("test");
        page.locator("input[name=\"password\"]").click();
        page.locator("input[name=\"password\"]").fill("test");
        page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Wyślij")).click();
        assertThat(page.getByText("test")).isVisible();
    }

    @org.junit.jupiter.api.Test
    public void zad1(){
        page.navigate("http://localhost:8080/");
        page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Zaloguj się lub zarejestruj")).click();
        page.locator("input[name=\"username\"]").click();
        page.locator("input[name=\"username\"]").fill("test");
        page.locator("input[name=\"password\"]").click();
        page.locator("input[name=\"password\"]").fill("test");
        page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Wyślij")).click();
        assertThat(page.getByText("test")).isVisible();
        page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Zadania").setExact(true)).click();
        page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Przejdź do zadania")).first().click();
        page.getByPlaceholder("Python code").click();
        page.getByPlaceholder("Python code").fill("print(input()[::-1])");
        page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Run")).click();
        assertThat(page.getByLabel("Swietnie!")).isVisible();
        page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Lista zadan")).click();
        assertThat(page.locator("div").filter(new Locator.FilterOptions().setHasText(Pattern.compile("^Wykonane \\(zdobyto 10 pkt\\.\\)$")))).isVisible();
        assertThat(page.getByText("10/70")).isVisible();
        page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Rankingi")).click();
        assertThat(page.getByText("1.test10 pkt.")).isVisible();
    }

    @org.junit.jupiter.api.Test
    public void zad2(){
        page.navigate("http://localhost:8080/");
        page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Zaloguj się lub zarejestruj")).click();
        page.locator("input[name=\"username\"]").click();
        page.locator("input[name=\"username\"]").fill("test");
        page.locator("input[name=\"password\"]").click();
        page.locator("input[name=\"password\"]").fill("test");
        page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Wyślij")).click();
        assertThat(page.getByText("test")).isVisible();
        page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Zadania").setExact(true)).click();
        page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Przejdź do zadania")).nth(1).click();
        page.getByPlaceholder("Python code").click();
        page.getByPlaceholder("Python code").fill("import re\n\ni = input()\nif re.search(\"^\\d+( \\d+)*$\", i):\n    i = list(map(int, i.split()))\n    print(i[-3::])\nelif re.search(\"^\\d+(.\\d+)*( \\d+.\\d+)*$\", i):\n    i = list(map(float, i.split()))\n    print(i[-3::])\nelse:\n    print(list(i[-3::]))");
        page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Run")).click();
        assertThat(page.getByLabel("Swietnie!")).isVisible();
        page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Powrot")).click();
        page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Rankingi")).click();
        assertThat(page.getByText("1.test25 pkt.")).isVisible();
        page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Zadania")).click();
        assertThat(page.getByText("25/70")).isVisible();
        assertThat(page.locator("div").filter(new Locator.FilterOptions().setHasText(Pattern.compile("^Wykonane \\(zdobyto 15 pkt\\.\\)$")))).isVisible();
    }

    @org.junit.jupiter.api.Test
    public void zad3(){
        page.navigate("http://localhost:8080/");
        page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Zaloguj się lub zarejestruj")).click();
        page.locator("input[name=\"username\"]").click();
        page.locator("input[name=\"username\"]").fill("test");
        page.locator("input[name=\"password\"]").click();
        page.locator("input[name=\"password\"]").fill("test");
        page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Wyślij")).click();
        assertThat(page.getByText("test")).isVisible();
        page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Zadania").setExact(true)).click();
        page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Przejdź do zadania")).nth(2).click();
        page.getByPlaceholder("Python code").click();
        page.getByPlaceholder("Python code").fill("import re\n\ni = input()\nif re.search(\"^(-?\\d+.\\d+ ?)+$\", i) is not None:\n  i = [float(x) for x in i.split()]\nelse:\n  i = [int(x) for x in i.split()]\n\nk = [0, 0]\nfor j in i:\n  if j<0:\n    k[0]+=1\n  if j>0:\n    k[1]+=1\n    \nprint(k)");
        page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Run")).click();
        assertThat(page.getByLabel("Swietnie!")).isVisible();
        page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Close")).click();
        page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Zadania")).click();
        assertThat(page.locator("div").filter(new Locator.FilterOptions().setHasText(Pattern.compile("^Wykonane \\(zdobyto 20 pkt\\.\\)$")))).isVisible();
        assertThat(page.getByText("45/70")).isVisible();
        page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Rankingi")).click();
        assertThat(page.getByText("1.test45 pkt.")).isVisible();
    }

    @org.junit.jupiter.api.Test
    public void zad4(){
        page.navigate("http://localhost:8080/");
        page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Zaloguj się lub zarejestruj")).click();
        page.locator("input[name=\"username\"]").click();
        page.locator("input[name=\"username\"]").fill("test");
        page.locator("input[name=\"password\"]").click();
        page.locator("input[name=\"password\"]").fill("test");
        page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Wyślij")).click();
        assertThat(page.getByText("test")).isVisible();
        page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Zadania").setExact(true)).click();
        page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Przejdź do zadania")).nth(3).click();
        page.getByPlaceholder("Python code").click();
        page.getByPlaceholder("Python code").fill("import sys, re\n\ni = input()\nif re.search(\"^\\d+$\", i) is not None:\n  i = int(i)\n  \nprint(sys.getsizeof(i))");
        page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Run")).click();
        assertThat(page.getByLabel("Swietnie!")).isVisible();
        page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Lista zadan")).click();
        assertThat(page.getByText("70/70")).isVisible();
        assertThat(page.locator("div").filter(new Locator.FilterOptions().setHasText(Pattern.compile("^Wykonane \\(zdobyto 25 pkt\\.\\)$")))).isVisible();
        page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Rankingi")).click();
        assertThat(page.getByText("1.test70 pkt.")).isVisible();
    }
}
