

$namepc = $env:computername 
$listakomp = @("cos", "Dekstop-1","desktop-2","lap1")
$nazwauzyt = @("AKlonowski","cos")
$pass = @("Pass123")
$changepass = @("yes","no")
$comm = @("klasa 2a", "klasa 3b")
$imie = @("Adam Kowalski")

if ($listakomp -contains $namepc) {
    $index =  [int]$listakomp.IndexOf($namepc)
    $user = $nazwauzyt[$index]
    $pasx = $pass[$index]
    Write-Host ("$user, $pasx")
#    $namex = $imie[$index]
    $kom = $comm[$index]
    if ($changepass[$index] -eq "yes") {
        $index =  [int]$listakomp.IndexOf($name)
        Net User /add $user $pasx /passwordreq:yes /logonpasswordchg:yes  /comment:$kom
        #/fullname:$namex
    }
    else {
        Net User /add $user $pasx /passwordreq:yes /logonpasswordchg:no  /comment:$kom   
        #/fullname:$namex
    }
    Write-Host("Uzytkownik "+ $user + " został dodany na komputerze "+ $namepc)
}
else {
    Write-Host("Ten komputer nie jest na liscie")
}


  