<?php

if($_FILES['file'][type] == 'image/jpeg' 
	|| $_FILES['file'][type] == 'image/gif' 
	|| $_FILES['file'][type] == 'image/png'){

	include_once("colors.inc.php");

	$image_to_read = $_FILES['file']['tmp_name'];
	 
	$colors_to_show = 25;

	$pal = new GetMostCommonColors();
	$pal->image = $image_to_read;
	$colors=$pal->Get_Color();
	$colors_key=array_keys($colors);

	echo json_encode($colors_key);

	unlink($image_to_read);
}

else{
	echo "error";
	unlink($image_to_read);
}

?>