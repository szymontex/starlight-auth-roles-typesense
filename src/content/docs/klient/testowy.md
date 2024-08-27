---
title: "testowy"
slug: 'klient/testowy'
description: "Ten przewodnik demonstruje różne funkcje i formatowania dostępne w Markdown w połączeniu z Starlight."
---

# Przykładowy Przewodnik Markdown

Witamy w przewodniku Markdown! Ten dokument pokazuje, jak używać różnych funkcji Markdown w Starlight.

## Nagłówki

Możesz tworzyć nagłówki używając `#`, `##`, `###`, itd.

# Nagłówek poziom 1
## Nagłówek poziom 2
### Nagłówek poziom 3
#### Nagłówek poziom 4
##### Nagłówek poziom 5
###### Nagłówek poziom 6

## Formatowanie tekstu

Markdown obsługuje różne formatowania tekstu:

- **Pogrubienie**: `**tekst**` lub `__tekst__`
- *Kursywa*: `*tekst*` lub `_tekst_`
- ~~Przekreślenie~~: `~~tekst~~`
- `Kod`: `` `kod` ``

Przykład: **pogrubiony tekst**, *kursywa*, ~~przekreślony~~, `kod`.

## Listy

### Lista numerowana

1. Pierwszy punkt
2. Drugi punkt
3. Trzeci punkt

### Lista punktowana

- Punkt pierwszy
- Punkt drugi
  - Podpunkt drugi
- Punkt trzeci

## Cytaty

Cytaty można tworzyć przy użyciu `>`.

> To jest przykład cytatu.

## Kod blokowy

Kod blokowy można wstawiać za pomocą trzech backticków (```) lub czterech spacji przed linią.

```javascript
function przyklad() {
  console.log("To jest przykład kodu JavaScript.");
}
```

## Obrazy

Obrazy można wstawiać za pomocą składni `![alt text](url)`.

```markdown
![Przykładowy obraz](https://via.placeholder.com/150)
```

## Linki

Linki można tworzyć za pomocą składni `[tekst](url)`.

```markdown
[Kliknij tutaj, aby przejść do Google](https://www.google.com)
```

## Tabele

Tabele są bardzo przydatne do wyświetlania danych w strukturze tabelarycznej.

```markdown
| Kolumna 1 | Kolumna 2 | Kolumna 3 |
|-----------|-----------|-----------|
| Wartość 1 | Wartość 2 | Wartość 3 |
| Wartość 4 | Wartość 5 | Wartość 6 |
```

## Wstawianie zawartości w Starlight

### Notatki

```markdown
::note
To jest notatka.
::
```

### Ostrzeżenie

```markdown
::warning
To jest ostrzeżenie.
::
```

### Panel informacji

```markdown
::info
To jest panel informacji.
::
```

### Blok przykładu

```markdown
::example
To jest przykład w Starlight.
::
```

## Emotikony

Możesz używać emotikonów w tekście: :smile:, :tada:, :rocket:.

## Zagnieżdżone elementy

### Listy w cytatach

```markdown
> - Punkt 1
> - Punkt 2
>   1. Podpunkt 1
>   2. Podpunkt 2
```

### Kod w cytatach

```markdown
> ```python
> def przyklad():
>     return "To jest kod w cytacie"
> ```
```

## Koniec dokumentu

To jest koniec przykładu dokumentu Markdown. Teraz możesz zacząć tworzyć własne przewodniki z wykorzystaniem Starlight i Markdown!