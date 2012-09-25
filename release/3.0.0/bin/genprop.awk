BEGIN {
	FS = " *= *"
	printf "// %s.%s.java\n", pkgnm, clsnm
	printf "//\n"
	printf "// Generated by genprop\n"
	printf "// DO NOT MODIFY IT MANUALLY. All modifications will be lost.\n"
	printf "//\n"
	printf "// %s, %s\n", usernm, when
	printf "// Copyright(C) 2001-2008 Potix Corporation. All Rights Reserved.\n\n"
	printf "package %s;\n", pkgnm
	printf "\npublic interface %s extends org.zkoss.mesg.MessageConst {\n", clsnm
	printf "\tstatic final int MESSAGE_ID = Aide.register(%s.class, \"%s\");\n", clsnm, msgnm
	key = ""
}

$1 == "#-" {
	key = $2
}

key != "" && NF >= 2 && /^[1-9a-f]/ {
	printf "\tstatic final int %s = 0x%s + MESSAGE_ID;\n", key, $1
	key = ""
}

/^0/ {
	printf "error: the hexadecimal (%s) must starts at 1000 and in lower case", $1
}

END {
	printf  "}\n"
}
