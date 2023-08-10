a = "aearataubebgbrcachcncocuczdeegfrgbgrhkhuidieilinitjpkrltlvmamxmyngnlnonzphplptrorsrusasesgsiskthtrtwuausveza"
country_list = []
for i in range(int(len(a))):
    if i%2 == 0:
        country_list.append(a[i:i+2])
    
print(f"Country List: {country_list}")