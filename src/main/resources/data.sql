INSERT INTO users values ('test','+ZTUPGMKhANnnjyVuEiwfg=='); -- username: test, password: test
INSERT INTO tasks (name, shortdesc, description, points) values ('Odwrócony napis','Wyświetl napis od tyłu','Kod przyjmuje na wejściu string, a na wyjściu zwraca string wyświetlony od tyłu',10);
INSERT INTO test_case values (1, 'a', 'a', 1);
INSERT INTO test_case values (1, 'python', 'nohtyp', 2);
INSERT INTO test_case values (1, 'ala ma kota', 'atok am ala', 3);
INSERT INTO test_case values (1, 'opo', 'opo', 4);
INSERT INTO tasks (name, shortdesc, description, points) values ('Ostatnie elementy', 'Wyświetl ostatnie 3 elementy tablicy', 'Kod przyjmuje na wejściu string (liczby całkowite lub zmiennoprzecinkowe oddzielone spacją), a na wyjściu zwraca maksymalnie 3 ostatnie elementy z tablicy', 15);
INSERT INTO test_case values (2, '1 2 3 4 5', '[3, 4, 5]', 5);
INSERT INTO test_case values (2, '1', '[1]', 6);
INSERT INTO test_case values (2, '', '[]', 7);
INSERT INTO test_case values (2, '1.5 2.3 3 4.6', '[2.3, 3.0, 4.6]', 8);
INSERT INTO tasks (name, shortdesc, description, points) values ('Sortowanie', 'Wyświetl posortowaną leksykograficznie tablicę' ,'Kod przyjmuje na wejściu X napisów oddzielonych spacjami, a na wyjściu zwraca posortowaną tablicę', 20);
INSERT INTO test_case values (3, '8hT&$kLp@ 2qW*9sE# pR5$yZaX! b7U^6jGv K#Lm3oQ1 tV9wP@Ii s4A%xNfO zY6&dC8B J7FqP*Rv xZ#D2MnH' , ARRAY['2qW*9sE#', '8hT&$kLp@', 'J7FqP*Rv', 'K#Lm3oQ1', 'b7U^6jGv', 'pR5$yZaX!', 's4A%xNfO', 'tV9wP@Ii', 'xZ#D2MnH', 'zY6&dC8B'], 9);
INSERT INTO test_case values (3, 'A a Aa AA aa aA', ARRAY['A', 'a', 'AA', 'Aa', 'aA', 'aa'], 10);
INSERT INTO test_case values (3, '56 23 98 12 34 72 45 67 89 10', ARRAY['10', '12', '23', '34', '45', '56', '67', '72', '89', '98'], 11);
INSERT INTO test_case values (3, 'Apple 56.78 banana123 23.4567 Cherry42 98.12345 Date 12.3 fig99 Grape99 alpha2beta 0.123 Zebra gamma10 100.567 1.0 Beta3Alpha delta Theta Eta', ARRAY['0.123', '1.0', '100.567', '12.3', '23.4567', '56.78', '98.12345', 'alpha2beta', 'Apple', 'banana123', 'Beta3Alpha', 'Cherry42', 'Date', 'delta', 'Eta', 'fig99', 'gamma10', 'Grape99', 'Theta', 'Zebra'], 12);
INSERT INTO tasks (name, shortdesc, description, points) VALUES ('Miejsce w pamięci', 'Wyświetl ile miejsca zajmuje napis', 'Kod przyjmuje na wejściu string, a na wyjściu zwraca int', 25);
INSERT INTO test_case values (4, '', '49', 13);
INSERT INTO test_case values (4, 'a', '50', 14);
INSERT INTO test_case values (4, '14', '28', 15);
INSERT INTO test_case values (4, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', '249', 16);