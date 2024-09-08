


#$namepc = $env:computername 
#$listakomp = @("cos", "Dekstop-1","desktop-2","lap1")
#$nazwauzyt = @("AKlonowski","cos")
#$pass = @("Pass123")
#$changepass = @("yes","no")
#$comm = @("klasa 2a", "klasa 3b")
#$imie = @("Adam Kowalski")

if ($listakomp -contains $namepc) {
    $index =  [int]$listakomp.IndexOf($namepc)
    $user = $nazwauzyt[$index]
    $pasx = $pass[$index]
    Write-Host ("$user, $pasx")
    $kom = $comm[$index]

    if ($null -ne $imie -and $imie.Count -gt 0) {
        $namex = $imie[$index]
        Net User /add "$user" "$pasx" /passwordreq:yes /logonpasswordchg:yes  /comment:"$kom" /fullname:"$namex"

    }       
    else {
        if ($changepass[$index] -eq "yes") {
            Net User /add "$user" "$pasx" /passwordreq:yes /logonpasswordchg:yes  /comment:"$kom"
            }
        else {
            Net User /add "$user" "$pasx" /passwordreq:yes /logonpasswordchg:no  /comment:"$kom"
        }
    }
    
    Write-Host("Uzytkownik "+ $user + " został dodany na komputerze "+ $namepc)
}
else {
    Write-Host("Ten komputer nie jest na liscie")
}


  