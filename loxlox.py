import sys
import time

def readFile(filename):
  file = open(filename, "r")
  return file.read()

def clock():
  return time.time()

__lox2python__cache = []
def getc():
  if (len(__lox2python__cache) <= 0):
    for input in sys.stdin:
      __lox2python__cache.extend([ord(char) for char in input])
  # print cache
  return __lox2python__cache.pop(0) if len(__lox2python__cache) > 0 else -1

closure = {}
closure["closure"] = {}
closure["LEFT_PAREN"] = 40
closure["RIGHT_PAREN"] = 41
closure["LEFT_BRACE"] = 123
closure["RIGHT_BRACE"] = 125
closure["COMMA"] = 44
closure["DOT"] = 46
closure["MINUS"] = 45
closure["PLUS"] = 43
closure["SEMICOLON"] = 59
closure["SLASH"] = 47
closure["STAR"] = 42
closure["BANG"] = 33
closure["EQUAL"] = 61
closure["GREATER"] = 62
closure["LESS"] = 60
closure["BANG_EQUAL"] = 256
closure["EQUAL_EQUAL"] = 257
closure["GREATER_EQUAL"] = 258
closure["LESS_EQUAL"] = 259
closure["IDENTIFIER"] = 260
closure["STRING"] = 261
closure["NUMBER"] = 262
closure["AND"] = 263
closure["CLASS"] = 264
closure["ELSE"] = 265
closure["FALSE"] = 266
closure["FUN"] = 267
closure["FOR"] = 268
closure["IF"] = 269
closure["NIL"] = 270
closure["OR"] = 271
closure["PRINT"] = 272
closure["RETURN"] = 273
closure["SUPER"] = 274
closure["THIS"] = 275
closure["TRUE"] = 276
closure["VAR"] = 277
closure["WHILE"] = 278
closure["EOF"] = 279
closure["INVALID"] = 280
class Token():
	def __init__(this, type, value, line):
		closure["__init__"] = dict().update(closure["__init__"])
		closure["__init__"]["this"] = this,		closure["__init__"]["type"] = type,		closure["__init__"]["value"] = value,		closure["__init__"]["line"] = line
		this.type = closure["type"]
		this.value = closure["value"]
		this.line = closure["line"]

closure["Token"] = Token
def print_error(err):
	closure["print_error"] = dict().update(closure["print_error"])
	closure["print_error"]["err"] = err
	print closure["err"]
closure["print_error"] = print_error
def tokenTypeStr(type):
	closure["tokenTypeStr"] = dict().update(closure["tokenTypeStr"])
	closure["tokenTypeStr"]["type"] = type
	if closure["type"] == closure["LEFT_PAREN"]:
		return "("
	if closure["type"] == closure["RIGHT_PAREN"]:
		return ")"
	if closure["type"] == closure["LEFT_BRACE"]:
		return "{"
	if closure["type"] == closure["RIGHT_BRACE"]:
		return "}"
	if closure["type"] == closure["COMMA"]:
		return ","
	if closure["type"] == closure["DOT"]:
		return "."
	if closure["type"] == closure["MINUS"]:
		return "-"
	if closure["type"] == closure["PLUS"]:
		return "+"
	if closure["type"] == closure["SEMICOLON"]:
		return ";"
	if closure["type"] == closure["SLASH"]:
		return "/"
	if closure["type"] == closure["STAR"]:
		return "*"
	if closure["type"] == closure["BANG"]:
		return "!"
	if closure["type"] == closure["EQUAL"]:
		return "="
	if closure["type"] == closure["GREATER"]:
		return ">"
	if closure["type"] == closure["LESS"]:
		return "<"
	if closure["type"] == closure["BANG_EQUAL"]:
		return "!="
	if closure["type"] == closure["EQUAL_EQUAL"]:
		return "=="
	if closure["type"] == closure["GREATER_EQUAL"]:
		return ">="
	if closure["type"] == closure["LESS_EQUAL"]:
		return "<="
	if closure["type"] == closure["IDENTIFIER"]:
		return "<identifier>"
	if closure["type"] == closure["STRING"]:
		return "<string>"
	if closure["type"] == closure["NUMBER"]:
		return "<number>"
	if closure["type"] == closure["AND"]:
		return "and"
	if closure["type"] == closure["CLASS"]:
		return "class"
	if closure["type"] == closure["ELSE"]:
		return "else"
	if closure["type"] == closure["FALSE"]:
		return "false"
	if closure["type"] == closure["FUN"]:
		return "fun"
	if closure["type"] == closure["FOR"]:
		return "for"
	if closure["type"] == closure["IF"]:
		return "if"
	if closure["type"] == closure["NIL"]:
		return "nil"
	if closure["type"] == closure["OR"]:
		return "or"
	if closure["type"] == closure["PRINT"]:
		return "print"
	if closure["type"] == closure["RETURN"]:
		return "return"
	if closure["type"] == closure["SUPER"]:
		return "super"
	if closure["type"] == closure["THIS"]:
		return "this"
	if closure["type"] == closure["TRUE"]:
		return "true"
	if closure["type"] == closure["VAR"]:
		return "var"
	if closure["type"] == closure["WHILE"]:
		return "while"
	if closure["type"] == closure["EOF"]:
		return "<eof>"
	if closure["type"] == closure["INVALID"]:
		return "<invalid>"
	return None
closure["tokenTypeStr"] = tokenTypeStr
def keywordType(name):
	closure["keywordType"] = dict().update(closure["keywordType"])
	closure["keywordType"]["name"] = name
	if closure["name"] == "and":
		return closure["AND"]
	if closure["name"] == "class":
		return closure["CLASS"]
	if closure["name"] == "else":
		return closure["ELSE"]
	if closure["name"] == "false":
		return closure["FALSE"]
	if closure["name"] == "fun":
		return closure["FUN"]
	if closure["name"] == "for":
		return closure["FOR"]
	if closure["name"] == "if":
		return closure["IF"]
	if closure["name"] == "nil":
		return closure["NIL"]
	if closure["name"] == "or":
		return closure["OR"]
	if closure["name"] == "print":
		return closure["PRINT"]
	if closure["name"] == "return":
		return closure["RETURN"]
	if closure["name"] == "super":
		return closure["SUPER"]
	if closure["name"] == "this":
		return closure["THIS"]
	if closure["name"] == "true":
		return closure["TRUE"]
	if closure["name"] == "var":
		return closure["VAR"]
	if closure["name"] == "while":
		return closure["WHILE"]
	return None
closure["keywordType"] = keywordType
def isNameStart(ch):
	closure["isNameStart"] = dict().update(closure["isNameStart"])
	closure["isNameStart"]["ch"] = ch
	return closure["ch"] == 95 or (closure["ch"] >= 97 and closure["ch"] <= 122) or (closure["ch"] >= 65 and closure["ch"] <= 90)
closure["isNameStart"] = isNameStart
def isDigit(ch):
	closure["isDigit"] = dict().update(closure["isDigit"])
	closure["isDigit"]["ch"] = ch
	return closure["ch"] >= 48 and closure["ch"] <= 57
closure["isDigit"] = isDigit
class Scanner():
	def __init__(this):
		closure["__init__"] = dict().update(closure["__init__"])
		closure["__init__"]["this"] = this
		this.line = 1
		this.buffered = None
		this.ch = -1
		this.advance()

	def advance(this):
		closure["advance"] = dict().update(closure["advance"])
		closure["advance"]["this"] = this
		closure["ch"] = this.ch
		this.ch = closure["getc"]()
		return closure["ch"]

	def next(this):
		closure["next"] = dict().update(closure["next"])
		closure["next"]["this"] = this
		if this.buffered != None:
			closure["buffered"] = this.buffered
			this.buffered = None
			return closure["buffered"]
		while this.ch >= 0:
			closure["ch"] = this.advance()
			if closure["ch"] == closure["LEFT_PAREN"]:
				return closure["Token"](closure["LEFT_PAREN"], None, this.line)
			else:
				if closure["ch"] == closure["RIGHT_PAREN"]:
					return closure["Token"](closure["RIGHT_PAREN"], None, this.line)
				else:
					if closure["ch"] == closure["LEFT_BRACE"]:
						return closure["Token"](closure["LEFT_BRACE"], None, this.line)
					else:
						if closure["ch"] == closure["RIGHT_BRACE"]:
							return closure["Token"](closure["RIGHT_BRACE"], None, this.line)
						else:
							if closure["ch"] == closure["COMMA"]:
								return closure["Token"](closure["COMMA"], None, this.line)
							else:
								if closure["ch"] == closure["DOT"]:
									return closure["Token"](closure["DOT"], None, this.line)
								else:
									if closure["ch"] == closure["MINUS"]:
										return closure["Token"](closure["MINUS"], None, this.line)
									else:
										if closure["ch"] == closure["PLUS"]:
											return closure["Token"](closure["PLUS"], None, this.line)
										else:
											if closure["ch"] == closure["SEMICOLON"]:
												return closure["Token"](closure["SEMICOLON"], None, this.line)
											else:
												if closure["ch"] == closure["STAR"]:
													return closure["Token"](closure["STAR"], None, this.line)
												else:
													if closure["ch"] == closure["BANG"]:
														if this.ch == closure["EQUAL"]:
															this.advance()
															return closure["Token"](closure["BANG_EQUAL"], None, this.line)
														return closure["Token"](closure["BANG"], None, this.line)
													else:
														if closure["ch"] == closure["EQUAL"]:
															if this.ch == closure["EQUAL"]:
																this.advance()
																return closure["Token"](closure["EQUAL_EQUAL"], None, this.line)
															return closure["Token"](closure["EQUAL"], None, this.line)
														else:
															if closure["ch"] == closure["LESS"]:
																if this.ch == closure["EQUAL"]:
																	this.advance()
																	return closure["Token"](closure["LESS_EQUAL"], None, this.line)
																return closure["Token"](closure["LESS"], None, this.line)
															else:
																if closure["ch"] == closure["GREATER"]:
																	if this.ch == closure["EQUAL"]:
																		this.advance()
																		return closure["Token"](closure["GREATER_EQUAL"], None, this.line)
																	return closure["Token"](closure["GREATER"], None, this.line)
																else:
																	if closure["ch"] == closure["SLASH"]:
																		if this.ch != closure["SLASH"]:
																			return closure["Token"](closure["SLASH"], None, this.line)
																		this.advance()
																		while this.ch >= 0 and this.ch != 10:
																			this.advance()
																		if this.ch == 10:
																			this.line = this.line + 1
																		this.advance()
																	else:
																		if closure["ch"] == 32 or closure["ch"] == 9 or closure["ch"] == 13:
																			pass
																		else:
																			if closure["ch"] == 10:
																				this.line = this.line + 1
																			else:
																				if closure["ch"] == 34:
																					closure["line"] = this.line
																					closure["value"] = ""
																					while this.ch >= 0 and this.ch != 34:
																						if this.ch == 10:
																							this.line = this.line + 1
																						value = closure["value"] + closure["chr"](this.ch)
																						this.advance()
																					if this.ch < 0:
																						return closure["Token"](closure["INVALID"], "Unterminated string.", this.line)
																					this.advance()
																					return closure["Token"](closure["STRING"], closure["value"], closure["line"])
																				else:
																					if closure["isDigit"](closure["ch"]):
																						closure["num"] = closure["ch"] - 48
																						while closure["isDigit"](this.ch):
																							num = closure["num"] * 10 + this.ch - 48
																							this.advance()
																						if this.ch == closure["DOT"]:
																							this.advance()
																							if not closure["isDigit"](this.ch):
																								this.buffered = closure["Token"](closure["DOT"], None, this.line)
																								return closure["Token"](closure["NUMBER"], closure["num"], this.line)
																							closure["numerator"] = 0
																							closure["denominator"] = 1
																							while closure["isDigit"](this.ch):
																								numerator = closure["numerator"] * 10 + this.ch - 48
																								denominator = closure["denominator"] * 10
																								this.advance()
																							num = closure["num"] + closure["numerator"] / closure["denominator"]
																						return closure["Token"](closure["NUMBER"], closure["num"], this.line)
																					else:
																						if closure["isNameStart"](closure["ch"]):
																							closure["name"] = closure["chr"](closure["ch"])
																							while closure["isNameStart"](this.ch) or closure["isDigit"](this.ch):
																								name = closure["name"] + closure["chr"](this.ch)
																								this.advance()
																							closure["keyword"] = closure["keywordType"](closure["name"])
																							if closure["keyword"] != None:
																								return closure["Token"](closure["keyword"], None, this.line)
																							return closure["Token"](closure["IDENTIFIER"], closure["name"], this.line)
																						else:
																							return closure["Token"](closure["INVALID"], "Unexpected character.", this.line)
		return closure["Token"](closure["EOF"], None, this.line)

closure["Scanner"] = Scanner
def testScanner():
	closure["testScanner"] = dict().update(closure["testScanner"])

	closure["scanner"] = closure["Scanner"]()
	closure["done"] = False
	while not closure["done"]:
		closure["token"] = closure["scanner"].next()
		if closure["token"].type == closure["EOF"]:
			done = True
		else:
			if closure["token"].type == closure["INVALID"]:
				done = True
				print closure["token"].value + " on line:"
				print closure["token"].line
			else:
				if closure["token"].value != None:
					print closure["tokenTypeStr"](closure["token"].type)
					print closure["token"].value
				else:
					print closure["tokenTypeStr"](closure["token"].type)
closure["testScanner"] = testScanner
class ListNode():
	def __init__(this, value):
		closure["__init__"] = dict().update(closure["__init__"])
		closure["__init__"]["this"] = this,		closure["__init__"]["value"] = value
		this.value = closure["value"]
		this.next = None
		this.previous = None

closure["ListNode"] = ListNode
class List():
	def __init__(this):
		closure["__init__"] = dict().update(closure["__init__"])
		closure["__init__"]["this"] = this
		this.head = None
		this.tail = None
		this._length = 0

	def append(this, value):
		closure["append"] = dict().update(closure["append"])
		closure["append"]["this"] = this,		closure["append"]["value"] = value
		closure["node"] = closure["ListNode"](closure["value"])
		if this.head == None:
			this.head = closure["node"]
			this.tail = closure["node"]
		else:
			closure["node"].previous = this.tail
			this.tail.next = closure["node"]
			this.tail = closure["node"]
		this._length = this._length + 1
		return this

	def pop(this):
		closure["pop"] = dict().update(closure["pop"])
		closure["pop"]["this"] = this
		if this.tail == None:
			return None
		closure["node"] = this.tail
		closure["previous"] = closure["node"].previous
		this.tail = closure["previous"]
		if closure["previous"] != None:
			closure["previous"].next = None
		else:
			this.head = None
		this._length = this._length - 1
		return closure["node"].value

	def foreach(this, f):
		closure["foreach"] = dict().update(closure["foreach"])
		closure["foreach"]["this"] = this,		closure["foreach"]["f"] = f
		closure["node"] = this.head
		while closure["node"] != None:
			if closure["f"](closure["node"].value):
				return None
			node = closure["node"].next

	def get(this, n):
		closure["get"] = dict().update(closure["get"])
		closure["get"]["this"] = this,		closure["get"]["n"] = n
		closure["node"] = this.head
		closure["i"] = 0
		while closure["node"] != None:
			if closure["i"] == closure["n"]:
				return closure["node"].value
			node = closure["node"].next
			i = closure["i"] + 1
		return None

	def length(this):
		closure["length"] = dict().update(closure["length"])
		closure["length"]["this"] = this
		return this._length

	def last(this):
		closure["last"] = dict().update(closure["last"])
		closure["last"]["this"] = this
		if this.tail != None:
			return this.tail.value
		return None

closure["List"] = List
class MapItem():
	def __init__(this, key, value):
		closure["__init__"] = dict().update(closure["__init__"])
		closure["__init__"]["this"] = this,		closure["__init__"]["key"] = key,		closure["__init__"]["value"] = value
		this.key = closure["key"]
		this.value = closure["value"]

closure["MapItem"] = MapItem
class Map():
	def __init__(this):
		closure["__init__"] = dict().update(closure["__init__"])
		closure["__init__"]["this"] = this
		this.items = closure["List"]()

	def find(this, key):
		closure["find"] = dict().update(closure["find"])
		closure["find"]["this"] = this,		closure["find"]["key"] = key
		closure["found"] = None
		def findItem(item):
			closure["findItem"] = dict().update(closure["findItem"])
			closure["findItem"]["item"] = item
			if closure["item"].key == closure["key"]:
				found = closure["item"]
				return True
			return False
		closure["findItem"] = findItem
		this.items.foreach(closure["findItem"])
		return closure["found"]

	def get(this, key):
		closure["get"] = dict().update(closure["get"])
		closure["get"]["this"] = this,		closure["get"]["key"] = key
		closure["item"] = this.find(closure["key"])
		if closure["item"] != None:
			return closure["item"].value
		return None

	def set(this, key, value):
		closure["set"] = dict().update(closure["set"])
		closure["set"]["this"] = this,		closure["set"]["key"] = key,		closure["set"]["value"] = value
		closure["item"] = this.find(closure["key"])
		if closure["item"] != None:
			closure["item"].value = closure["value"]
		else:
			this.items.append(closure["MapItem"](closure["key"], closure["value"]))

closure["Map"] = Map
class EnvironmentItem():
	def __init__(this, name, value):
		closure["__init__"] = dict().update(closure["__init__"])
		closure["__init__"]["this"] = this,		closure["__init__"]["name"] = name,		closure["__init__"]["value"] = value
		this.name = closure["name"]
		this.value = closure["value"]

closure["EnvironmentItem"] = EnvironmentItem
class Environment():
	def __init__(this, enclosing):
		closure["__init__"] = dict().update(closure["__init__"])
		closure["__init__"]["this"] = this,		closure["__init__"]["enclosing"] = enclosing
		this.enclosing = closure["enclosing"]
		this.values = closure["Map"]()

	def get(this, name):
		closure["get"] = dict().update(closure["get"])
		closure["get"]["this"] = this,		closure["get"]["name"] = name
		closure["item"] = this.values.find(closure["name"])
		if closure["item"] != None:
			return closure["item"].value
		if this.enclosing != None:
			return this.enclosing.get(closure["name"])
		closure["runtimeError"]("Undefined variable '" + closure["name"] + "'.")

	def assign(this, name, value):
		closure["assign"] = dict().update(closure["assign"])
		closure["assign"]["this"] = this,		closure["assign"]["name"] = name,		closure["assign"]["value"] = value
		closure["item"] = this.values.find(closure["name"])
		if closure["item"] != None:
			closure["item"].value = closure["value"]
			return None
		if this.enclosing != None:
			this.enclosing.assign(closure["name"], closure["value"])
			return None
		closure["runtimeError"]("Undefined variable '" + closure["name"] + "'.")

	def define(this, name, value):
		closure["define"] = dict().update(closure["define"])
		closure["define"]["this"] = this,		closure["define"]["name"] = name,		closure["define"]["value"] = value
		this.values.set(closure["name"], closure["value"])

	def ancestor(this, distance):
		closure["ancestor"] = dict().update(closure["ancestor"])
		closure["ancestor"]["this"] = this,		closure["ancestor"]["distance"] = distance
		closure["environment"] = this
		closure["i"] = 0
		while closure["i"] < closure["distance"]:
			environment = closure["environment"].enclosing
			i = closure["i"] + 1
		return closure["environment"]

	def getAt(this, distance, name):
		closure["getAt"] = dict().update(closure["getAt"])
		closure["getAt"]["this"] = this,		closure["getAt"]["distance"] = distance,		closure["getAt"]["name"] = name
		return this.ancestor(closure["distance"]).values.get(closure["name"])

	def assignAt(this, distance, name, value):
		closure["assignAt"] = dict().update(closure["assignAt"])
		closure["assignAt"]["this"] = this,		closure["assignAt"]["distance"] = distance,		closure["assignAt"]["name"] = name,		closure["assignAt"]["value"] = value
		this.ancestor(closure["distance"]).values.set(closure["name"], closure["value"])

closure["Environment"] = Environment
def numberStr(num):
	closure["numberStr"] = dict().update(closure["numberStr"])
	closure["numberStr"]["num"] = num
	closure["s"] = ""
	if closure["num"] < 0:
		s = "-"
		num = -closure["num"]
	closure["mult"] = 1
	while closure["mult"] * 10 <= closure["num"]:
		mult = closure["mult"] * 10
	while closure["mult"] >= 1:
		closure["digit"] = 0
		while closure["mult"] * (closure["digit"] + 1) <= closure["num"]:
			digit = closure["digit"] + 1
		s = closure["s"] + closure["chr"](closure["digit"] + 48)
		num = closure["num"] - closure["mult"] * closure["digit"]
		mult = closure["mult"] / 10
	if closure["num"] != 0:
		s = closure["s"] + "."
		num = closure["num"] + 0.0005
		closure["places"] = 0
		while closure["places"] < 3:
			num = closure["num"] * 10
			closure["digit"] = 0
			while closure["digit"] + 1 <= closure["num"]:
				digit = closure["digit"] + 1
			s = closure["s"] + closure["chr"](closure["digit"] + 48)
			num = closure["num"] - closure["digit"]
			places = closure["places"] + 1
	return closure["s"]
closure["numberStr"] = numberStr
class Assign():
	def __init__(this, name, value):
		closure["__init__"] = dict().update(closure["__init__"])
		closure["__init__"]["this"] = this,		closure["__init__"]["name"] = name,		closure["__init__"]["value"] = value
		this.type = "Assign"
		this.name = closure["name"]
		this.value = closure["value"]

	def str(this):
		closure["str"] = dict().update(closure["str"])
		closure["str"]["this"] = this
		return this.name + " = " + this.value.str()

	def resolve(this, resolver):
		closure["resolve"] = dict().update(closure["resolve"])
		closure["resolve"]["this"] = this,		closure["resolve"]["resolver"] = resolver
		this.value.resolve(closure["resolver"])
		closure["resolver"].resolveVar(this, this.name)

	def evaluate(this, interpreter):
		closure["evaluate"] = dict().update(closure["evaluate"])
		closure["evaluate"]["this"] = this,		closure["evaluate"]["interpreter"] = interpreter
		closure["value"] = this.value.evaluate(closure["interpreter"])
		closure["distance"] = closure["interpreter"].locals.get(this)
		if closure["distance"] != None:
			closure["interpreter"].environment.assignAt(closure["distance"], this.name, closure["value"])
		else:
			closure["interpreter"].globals.assign(this.name, closure["value"])
		return closure["value"]

closure["Assign"] = Assign
class Binary():
	def __init__(this, left, operator, right):
		closure["__init__"] = dict().update(closure["__init__"])
		closure["__init__"]["this"] = this,		closure["__init__"]["left"] = left,		closure["__init__"]["operator"] = operator,		closure["__init__"]["right"] = right
		this.type = "Binary"
		this.left = closure["left"]
		this.operator = closure["operator"]
		this.right = closure["right"]

	def resolve(this, resolver):
		closure["resolve"] = dict().update(closure["resolve"])
		closure["resolve"]["this"] = this,		closure["resolve"]["resolver"] = resolver
		this.left.resolve(closure["resolver"])
		this.right.resolve(closure["resolver"])

	def str(this):
		closure["str"] = dict().update(closure["str"])
		closure["str"]["this"] = this
		return "(" + this.left.str() + " " + closure["tokenTypeStr"](this.operator) + " " + this.right.str() + ")"

	def evaluate(this, interpreter):
		closure["evaluate"] = dict().update(closure["evaluate"])
		closure["evaluate"]["this"] = this,		closure["evaluate"]["interpreter"] = interpreter
		closure["left"] = this.left.evaluate(closure["interpreter"])
		closure["right"] = this.right.evaluate(closure["interpreter"])
		if this.operator == closure["PLUS"]:
			return closure["left"] + closure["right"]
		if this.operator == closure["MINUS"]:
			return closure["left"] - closure["right"]
		if this.operator == closure["STAR"]:
			return closure["left"] * closure["right"]
		if this.operator == closure["SLASH"]:
			return closure["left"] / closure["right"]
		if this.operator == closure["BANG_EQUAL"]:
			return closure["left"] != closure["right"]
		if this.operator == closure["EQUAL_EQUAL"]:
			return closure["left"] == closure["right"]
		if this.operator == closure["GREATER"]:
			return closure["left"] > closure["right"]
		if this.operator == closure["GREATER_EQUAL"]:
			return closure["left"] >= closure["right"]
		if this.operator == closure["LESS"]:
			return closure["left"] < closure["right"]
		if this.operator == closure["LESS_EQUAL"]:
			return closure["left"] <= closure["right"]
		return None

closure["Binary"] = Binary
class Call():
	def __init__(this, callee, arguments):
		closure["__init__"] = dict().update(closure["__init__"])
		closure["__init__"]["this"] = this,		closure["__init__"]["callee"] = callee,		closure["__init__"]["arguments"] = arguments
		this.type = "Call"
		this.callee = closure["callee"]
		this.arguments = closure["arguments"]

	def str(this):
		closure["str"] = dict().update(closure["str"])
		closure["str"]["this"] = this
		closure["s"] = this.callee.str() + "("
		closure["addComma"] = False
		def addArgument(argument):
			closure["addArgument"] = dict().update(closure["addArgument"])
			closure["addArgument"]["argument"] = argument
			if closure["addComma"]:
				s = closure["s"] + ", "
			addComma = True
			s = closure["s"] + closure["argument"].str()
		closure["addArgument"] = addArgument
		this.arguments.foreach(closure["addArgument"])
		s = closure["s"] + ")"
		return closure["s"]

	def resolve(this, resolver):
		closure["resolve"] = dict().update(closure["resolve"])
		closure["resolve"]["this"] = this,		closure["resolve"]["resolver"] = resolver
		this.callee.resolve(closure["resolver"])
		def resolveArgument(argument):
			closure["resolveArgument"] = dict().update(closure["resolveArgument"])
			closure["resolveArgument"]["argument"] = argument
			closure["argument"].resolve(closure["resolver"])
		closure["resolveArgument"] = resolveArgument
		this.arguments.foreach(closure["resolveArgument"])

	def evaluate(this, interpreter):
		closure["evaluate"] = dict().update(closure["evaluate"])
		closure["evaluate"]["this"] = this,		closure["evaluate"]["interpreter"] = interpreter
		closure["callee"] = this.callee.evaluate(closure["interpreter"])
		closure["arguments"] = closure["List"]()
		def addArgument(argument):
			closure["addArgument"] = dict().update(closure["addArgument"])
			closure["addArgument"]["argument"] = argument
			closure["arguments"].append(closure["argument"].evaluate(closure["interpreter"]))
		closure["addArgument"] = addArgument
		this.arguments.foreach(closure["addArgument"])
		if closure["arguments"].length() != closure["callee"].arity():
			closure["runtimeError"]("Expected " + closure["numberStr"](closure["callee"].arity()) + " arguments but got " + closure["numberStr"](closure["arguments"].length()) + ".")
		return closure["callee"].call(closure["interpreter"], closure["arguments"])

closure["Call"] = Call
class Get():
	def __init__(this, object, name):
		closure["__init__"] = dict().update(closure["__init__"])
		closure["__init__"]["this"] = this,		closure["__init__"]["object"] = object,		closure["__init__"]["name"] = name
		this.type = "Get"
		this.object = closure["object"]
		this.name = closure["name"]

	def str(this):
		closure["str"] = dict().update(closure["str"])
		closure["str"]["this"] = this
		return this.object.str() + "." + this.name

	def resolve(this, resolver):
		closure["resolve"] = dict().update(closure["resolve"])
		closure["resolve"]["this"] = this,		closure["resolve"]["resolver"] = resolver
		this.object.resolve(closure["resolver"])

	def evaluate(this, interpreter):
		closure["evaluate"] = dict().update(closure["evaluate"])
		closure["evaluate"]["this"] = this,		closure["evaluate"]["interpreter"] = interpreter
		closure["object"] = this.object.evaluate(closure["interpreter"])
		return closure["object"].get(this.name)

closure["Get"] = Get
class Grouping():
	def __init__(this, expr):
		closure["__init__"] = dict().update(closure["__init__"])
		closure["__init__"]["this"] = this,		closure["__init__"]["expr"] = expr
		this.type = "Grouping"
		this.expr = closure["expr"]

	def str(this):
		closure["str"] = dict().update(closure["str"])
		closure["str"]["this"] = this
		return "(" + this.expr.str() + ")"

	def resolve(this, resolver):
		closure["resolve"] = dict().update(closure["resolve"])
		closure["resolve"]["this"] = this,		closure["resolve"]["resolver"] = resolver
		this.expr.resolve(closure["resolver"])

	def evaluate(this, interpreter):
		closure["evaluate"] = dict().update(closure["evaluate"])
		closure["evaluate"]["this"] = this,		closure["evaluate"]["interpreter"] = interpreter
		return this.expr.evaluate(closure["interpreter"])

closure["Grouping"] = Grouping
class Literal():
	def __init__(this, kind, value):
		closure["__init__"] = dict().update(closure["__init__"])
		closure["__init__"]["this"] = this,		closure["__init__"]["kind"] = kind,		closure["__init__"]["value"] = value
		this.type = "Literal"
		this.kind = closure["kind"]
		this.value = closure["value"]

	def str(this):
		closure["str"] = dict().update(closure["str"])
		closure["str"]["this"] = this
		if this.kind == "boolean":
			if this.value:
				return "true"
			else:
				return "false"
		if this.kind == "nil":
			return "nil"
		if this.kind == "number":
			return closure["numberStr"](this.value)
		if this.kind == "string":
			return closure["chr"](34) + this.value + closure["chr"](34)
		return "<unexpected kind>"

	def resolve(this, resolver):
		closure["resolve"] = dict().update(closure["resolve"])
		closure["resolve"]["this"] = this,		closure["resolve"]["resolver"] = resolver
		pass

	def evaluate(this, interpreter):
		closure["evaluate"] = dict().update(closure["evaluate"])
		closure["evaluate"]["this"] = this,		closure["evaluate"]["interpreter"] = interpreter
		return this.value

closure["Literal"] = Literal
class Logical():
	def __init__(this, left, operator, right):
		closure["__init__"] = dict().update(closure["__init__"])
		closure["__init__"]["this"] = this,		closure["__init__"]["left"] = left,		closure["__init__"]["operator"] = operator,		closure["__init__"]["right"] = right
		this.type = "Logical"
		this.left = closure["left"]
		this.operator = closure["operator"]
		this.right = closure["right"]

	def str(this):
		closure["str"] = dict().update(closure["str"])
		closure["str"]["this"] = this
		return "(" + this.left.str() + " " + closure["tokenTypeStr"](this.operator) + " " + this.right.str() + ")"

	def resolve(this, resolver):
		closure["resolve"] = dict().update(closure["resolve"])
		closure["resolve"]["this"] = this,		closure["resolve"]["resolver"] = resolver
		this.left.resolve(closure["resolver"])
		this.right.resolve(closure["resolver"])

	def evaluate(this, interpreter):
		closure["evaluate"] = dict().update(closure["evaluate"])
		closure["evaluate"]["this"] = this,		closure["evaluate"]["interpreter"] = interpreter
		closure["left"] = this.left.evaluate(closure["interpreter"])
		if this.operator == closure["AND"]:
			return closure["left"] and this.right.evaluate(closure["interpreter"])
		else:
			return closure["left"] or this.right.evaluate(closure["interpreter"])

closure["Logical"] = Logical
class Set():
	def __init__(this, object, name, value):
		closure["__init__"] = dict().update(closure["__init__"])
		closure["__init__"]["this"] = this,		closure["__init__"]["object"] = object,		closure["__init__"]["name"] = name,		closure["__init__"]["value"] = value
		this.type = "Set"
		this.object = closure["object"]
		this.name = closure["name"]
		this.value = closure["value"]

	def str(this):
		closure["str"] = dict().update(closure["str"])
		closure["str"]["this"] = this
		return this.object.str() + "." + this.name + " = " + this.value.str()

	def resolve(this, resolver):
		closure["resolve"] = dict().update(closure["resolve"])
		closure["resolve"]["this"] = this,		closure["resolve"]["resolver"] = resolver
		this.value.resolve(closure["resolver"])
		this.object.resolve(closure["resolver"])

	def evaluate(this, interpreter):
		closure["evaluate"] = dict().update(closure["evaluate"])
		closure["evaluate"]["this"] = this,		closure["evaluate"]["interpreter"] = interpreter
		closure["object"] = this.object.evaluate(closure["interpreter"])
		closure["value"] = this.value.evaluate(closure["interpreter"])
		closure["object"].set(this.name, closure["value"])
		return closure["value"]

closure["Set"] = Set
class Super():
	def __init__(this, method):
		closure["__init__"] = dict().update(closure["__init__"])
		closure["__init__"]["this"] = this,		closure["__init__"]["method"] = method
		this.type = "Super"
		this.method = closure["method"]

	def str(this):
		closure["str"] = dict().update(closure["str"])
		closure["str"]["this"] = this
		return "super." + this.method

	def resolve(this, resolver):
		closure["resolve"] = dict().update(closure["resolve"])
		closure["resolve"]["this"] = this,		closure["resolve"]["resolver"] = resolver
		closure["resolver"].resolveVar(this, "super")

	def evaluate(this, interpreter):
		closure["evaluate"] = dict().update(closure["evaluate"])
		closure["evaluate"]["this"] = this,		closure["evaluate"]["interpreter"] = interpreter
		closure["distance"] = closure["interpreter"].locals.get(this)
		closure["superclass"] = closure["interpreter"].environment.getAt(closure["distance"], "super")
		closure["object"] = closure["interpreter"].environment.getAt(closure["distance"] - 1, "this")
		closure["method"] = closure["superclass"].findMethod(closure["object"], this.method)
		if closure["method"] == None:
			closure["runtimeError"]("Undefined property '" + this.method + "'.")
		return closure["method"]

closure["Super"] = Super
class This():
	def __init__(this):
		closure["__init__"] = dict().update(closure["__init__"])
		closure["__init__"]["this"] = this
		this.type = "This"

	def str(this):
		closure["str"] = dict().update(closure["str"])
		closure["str"]["this"] = this
		return "this"

	def resolve(this, resolver):
		closure["resolve"] = dict().update(closure["resolve"])
		closure["resolve"]["this"] = this,		closure["resolve"]["resolver"] = resolver
		closure["resolver"].resolveVar(this, "this")

	def evaluate(this, interpreter):
		closure["evaluate"] = dict().update(closure["evaluate"])
		closure["evaluate"]["this"] = this,		closure["evaluate"]["interpreter"] = interpreter
		return closure["interpreter"].lookupVariable("this", this)

closure["This"] = This
class Unary():
	def __init__(this, operator, right):
		closure["__init__"] = dict().update(closure["__init__"])
		closure["__init__"]["this"] = this,		closure["__init__"]["operator"] = operator,		closure["__init__"]["right"] = right
		this.type = "Unary"
		this.operator = closure["operator"]
		this.right = closure["right"]

	def str(this):
		closure["str"] = dict().update(closure["str"])
		closure["str"]["this"] = this
		return closure["tokenTypeStr"](this.operator) + this.right.str()

	def resolve(this, resolver):
		closure["resolve"] = dict().update(closure["resolve"])
		closure["resolve"]["this"] = this,		closure["resolve"]["resolver"] = resolver
		this.right.resolve(closure["resolver"])

	def evaluate(this, interpreter):
		closure["evaluate"] = dict().update(closure["evaluate"])
		closure["evaluate"]["this"] = this,		closure["evaluate"]["interpreter"] = interpreter
		closure["right"] = this.right.evaluate(closure["interpreter"])
		if this.operator == closure["BANG"]:
			return not closure["right"]
		return -closure["right"]

closure["Unary"] = Unary
class Variable():
	def __init__(this, name):
		closure["__init__"] = dict().update(closure["__init__"])
		closure["__init__"]["this"] = this,		closure["__init__"]["name"] = name
		this.type = "Variable"
		this.name = closure["name"]

	def str(this):
		closure["str"] = dict().update(closure["str"])
		closure["str"]["this"] = this
		return this.name

	def resolve(this, resolver):
		closure["resolve"] = dict().update(closure["resolve"])
		closure["resolve"]["this"] = this,		closure["resolve"]["resolver"] = resolver
		if closure["resolver"].scopes.length() != 0 and closure["resolver"].scopes.last().get(this.name) == False:
			closure["resolver"].error("Error at '" + this.name + "': Cannot read local variable in its own initializer.")
		closure["resolver"].resolveVar(this, this.name)

	def evaluate(this, interpreter):
		closure["evaluate"] = dict().update(closure["evaluate"])
		closure["evaluate"]["this"] = this,		closure["evaluate"]["interpreter"] = interpreter
		return closure["interpreter"].lookupVariable(this.name, this)

closure["Variable"] = Variable
class Program():
	def __init__(this, statements):
		closure["__init__"] = dict().update(closure["__init__"])
		closure["__init__"]["this"] = this,		closure["__init__"]["statements"] = statements
		this.type = "Program"
		this.statements = closure["statements"]

	def str(this):
		closure["str"] = dict().update(closure["str"])
		closure["str"]["this"] = this
		closure["s"] = ""
		def format(statement):
			closure["format"] = dict().update(closure["format"])
			closure["format"]["statement"] = statement
			s = closure["s"] + closure["statement"].str()
		closure["format"] = format
		this.statements.foreach(closure["format"])
		return closure["s"]

	def resolve(this, resolver):
		closure["resolve"] = dict().update(closure["resolve"])
		closure["resolve"]["this"] = this,		closure["resolve"]["resolver"] = resolver
		def resolveStatement(statement):
			closure["resolveStatement"] = dict().update(closure["resolveStatement"])
			closure["resolveStatement"]["statement"] = statement
			closure["statement"].resolve(closure["resolver"])
		closure["resolveStatement"] = resolveStatement
		this.statements.foreach(closure["resolveStatement"])

	def execute(this, interpreter):
		closure["execute"] = dict().update(closure["execute"])
		closure["execute"]["this"] = this,		closure["execute"]["interpreter"] = interpreter
		def executeStatement(statement):
			closure["executeStatement"] = dict().update(closure["executeStatement"])
			closure["executeStatement"]["statement"] = statement
			closure["statement"].execute(closure["interpreter"])
		closure["executeStatement"] = executeStatement
		this.statements.foreach(closure["executeStatement"])

closure["Program"] = Program
closure["indent"] = 0
class Block():
	def __init__(this, statements):
		closure["__init__"] = dict().update(closure["__init__"])
		closure["__init__"]["this"] = this,		closure["__init__"]["statements"] = statements
		this.type = "Block"
		this.statements = closure["statements"]

	def str(this):
		closure["str"] = dict().update(closure["str"])
		closure["str"]["this"] = this
		closure["s"] = "{" + closure["chr"](10)
		indent = closure["indent"] + 1
		def format(statement):
			closure["format"] = dict().update(closure["format"])
			closure["format"]["statement"] = statement
			closure["i"] = 0
			while closure["i"] < closure["indent"]:
				s = closure["s"] + "  "
				i = closure["i"] + 1
			s = closure["s"] + closure["statement"].str()
		closure["format"] = format
		this.statements.foreach(closure["format"])
		indent = closure["indent"] - 1
		closure["i"] = 0
		while closure["i"] < closure["indent"]:
			s = closure["s"] + "  "
			i = closure["i"] + 1
		s = closure["s"] + "}" + closure["chr"](10)
		return closure["s"]

	def resolve(this, resolver):
		closure["resolve"] = dict().update(closure["resolve"])
		closure["resolve"]["this"] = this,		closure["resolve"]["resolver"] = resolver
		closure["resolver"].beginScope()
		def resolveStatement(statement):
			closure["resolveStatement"] = dict().update(closure["resolveStatement"])
			closure["resolveStatement"]["statement"] = statement
			closure["statement"].resolve(closure["resolver"])
		closure["resolveStatement"] = resolveStatement
		this.statements.foreach(closure["resolveStatement"])
		closure["resolver"].endScope()

	def execute(this, interpreter):
		closure["execute"] = dict().update(closure["execute"])
		closure["execute"]["this"] = this,		closure["execute"]["interpreter"] = interpreter
		return closure["interpreter"].executeBlock(this.statements, closure["Environment"](closure["interpreter"].environment))

closure["Block"] = Block
class Class():
	def __init__(this, name, superclass, methods):
		closure["__init__"] = dict().update(closure["__init__"])
		closure["__init__"]["this"] = this,		closure["__init__"]["name"] = name,		closure["__init__"]["superclass"] = superclass,		closure["__init__"]["methods"] = methods
		this.type = "Class"
		this.name = closure["name"]
		this.superclass = closure["superclass"]
		this.methods = closure["methods"]

	def str(this):
		closure["str"] = dict().update(closure["str"])
		closure["str"]["this"] = this
		closure["s"] = "class " + this.name + " "
		if this.superclass != None:
			s = closure["s"] + "< " + this.superclass.name + " "
		s = closure["s"] + closure["Block"](this.methods).str()
		return closure["s"]

	def resolve(this, resolver):
		closure["resolve"] = dict().update(closure["resolve"])
		closure["resolve"]["this"] = this,		closure["resolve"]["resolver"] = resolver
		closure["resolver"].declare(this.name)
		if this.superclass != None:
			this.superclass.resolve(closure["resolver"])
		closure["resolver"].define(this.name)
		if this.superclass != None:
			closure["resolver"].beginScope()
			closure["resolver"].scopes.last().set("super", True)
		closure["resolver"].beginScope()
		closure["resolver"].scopes.last().set("this", True)
		def resolveMethod(method):
			closure["resolveMethod"] = dict().update(closure["resolveMethod"])
			closure["resolveMethod"]["method"] = method
			closure["resolver"].resolveFunction(closure["method"])
		closure["resolveMethod"] = resolveMethod
		this.methods.foreach(closure["resolveMethod"])
		closure["resolver"].endScope()
		if this.superclass != None:
			closure["resolver"].endScope()

	def execute(this, interpreter):
		closure["execute"] = dict().update(closure["execute"])
		closure["execute"]["this"] = this,		closure["execute"]["interpreter"] = interpreter
		closure["superclass"] = None
		if this.superclass != None:
			superclass = this.superclass.evaluate(closure["interpreter"])
			closure["superclass"].findMethod
		closure["interpreter"].environment.define(this.name, None)
		if this.superclass != None:
			closure["interpreter"].environment = closure["Environment"](closure["interpreter"].environment)
			closure["interpreter"].environment.define("super", closure["superclass"])
		closure["methods"] = closure["Map"]()
		def addMethod(method):
			closure["addMethod"] = dict().update(closure["addMethod"])
			closure["addMethod"]["method"] = method
			closure["function"] = closure["LoxFunction"](closure["method"], closure["interpreter"].environment, closure["method"].name == "init")
			closure["methods"].set(closure["method"].name, closure["function"])
		closure["addMethod"] = addMethod
		this.methods.foreach(closure["addMethod"])
		closure["klass"] = closure["LoxClass"](this.name, closure["superclass"], closure["methods"])
		if this.superclass != None:
			closure["interpreter"].environment = closure["interpreter"].environment.enclosing
		closure["interpreter"].environment.assign(this.name, closure["klass"])

closure["Class"] = Class
class Expression():
	def __init__(this, expression):
		closure["__init__"] = dict().update(closure["__init__"])
		closure["__init__"]["this"] = this,		closure["__init__"]["expression"] = expression
		this.type = "Expression"
		this.expression = closure["expression"]

	def str(this):
		closure["str"] = dict().update(closure["str"])
		closure["str"]["this"] = this
		return this.expression.str() + ";" + closure["chr"](10)

	def resolve(this, resolver):
		closure["resolve"] = dict().update(closure["resolve"])
		closure["resolve"]["this"] = this,		closure["resolve"]["resolver"] = resolver
		this.expression.resolve(closure["resolver"])

	def execute(this, interpreter):
		closure["execute"] = dict().update(closure["execute"])
		closure["execute"]["this"] = this,		closure["execute"]["interpreter"] = interpreter
		this.expression.evaluate(closure["interpreter"])

closure["Expression"] = Expression
class Function():
	def __init__(this, name, params, body):
		closure["__init__"] = dict().update(closure["__init__"])
		closure["__init__"]["this"] = this,		closure["__init__"]["name"] = name,		closure["__init__"]["params"] = params,		closure["__init__"]["body"] = body
		this.type = "Function"
		this.name = closure["name"]
		this.params = closure["params"]
		this.body = closure["body"]

	def str(this):
		closure["str"] = dict().update(closure["str"])
		closure["str"]["this"] = this
		closure["s"] = "fun " + this.name + "("
		closure["addComma"] = False
		def addParam(param):
			closure["addParam"] = dict().update(closure["addParam"])
			closure["addParam"]["param"] = param
			if closure["addComma"]:
				s = closure["s"] + ", "
			addComma = True
			s = closure["s"] + closure["param"]
		closure["addParam"] = addParam
		this.params.foreach(closure["addParam"])
		s = closure["s"] + ") "
		s = closure["s"] + closure["Block"](this.body).str()
		return closure["s"]

	def resolve(this, resolver):
		closure["resolve"] = dict().update(closure["resolve"])
		closure["resolve"]["this"] = this,		closure["resolve"]["resolver"] = resolver
		closure["resolver"].declare(this.name)
		closure["resolver"].define(this.name)
		closure["resolver"].resolveFunction(this)

	def execute(this, interpreter):
		closure["execute"] = dict().update(closure["execute"])
		closure["execute"]["this"] = this,		closure["execute"]["interpreter"] = interpreter
		closure["function"] = closure["LoxFunction"](this, closure["interpreter"].environment, False)
		closure["interpreter"].environment.define(this.name, closure["function"])

closure["Function"] = Function
class If():
	def __init__(this, condition, thenBranch, elseBranch):
		closure["__init__"] = dict().update(closure["__init__"])
		closure["__init__"]["this"] = this,		closure["__init__"]["condition"] = condition,		closure["__init__"]["thenBranch"] = thenBranch,		closure["__init__"]["elseBranch"] = elseBranch
		this.type = "If"
		this.condition = closure["condition"]
		this.thenBranch = closure["thenBranch"]
		this.elseBranch = closure["elseBranch"]

	def str(this):
		closure["str"] = dict().update(closure["str"])
		closure["str"]["this"] = this
		closure["s"] = "if (" + this.condition.str() + ") " + this.thenBranch.str()
		if this.elseBranch != None:
			closure["i"] = 0
			while closure["i"] < closure["indent"]:
				s = closure["s"] + "  "
				i = closure["i"] + 1
			s = closure["s"] + "else " + this.elseBranch.str()
		return closure["s"]

	def resolve(this, resolver):
		closure["resolve"] = dict().update(closure["resolve"])
		closure["resolve"]["this"] = this,		closure["resolve"]["resolver"] = resolver
		this.condition.resolve(closure["resolver"])
		this.thenBranch.resolve(closure["resolver"])
		if this.elseBranch != None:
			this.elseBranch.resolve(closure["resolver"])

	def execute(this, interpreter):
		closure["execute"] = dict().update(closure["execute"])
		closure["execute"]["this"] = this,		closure["execute"]["interpreter"] = interpreter
		if this.condition.evaluate(closure["interpreter"]):
			return this.thenBranch.execute(closure["interpreter"])
		else:
			if this.elseBranch != None:
				return this.elseBranch.execute(closure["interpreter"])

closure["If"] = If
class Print():
	def __init__(this, expression):
		closure["__init__"] = dict().update(closure["__init__"])
		closure["__init__"]["this"] = this,		closure["__init__"]["expression"] = expression
		this.type = "Print"
		this.expression = closure["expression"]

	def str(this):
		closure["str"] = dict().update(closure["str"])
		closure["str"]["this"] = this
		return "print " + this.expression.str() + ";" + closure["chr"](10)

	def resolve(this, resolver):
		closure["resolve"] = dict().update(closure["resolve"])
		closure["resolve"]["this"] = this,		closure["resolve"]["resolver"] = resolver
		this.expression.resolve(closure["resolver"])

	def execute(this, interpreter):
		closure["execute"] = dict().update(closure["execute"])
		closure["execute"]["this"] = this,		closure["execute"]["interpreter"] = interpreter
		print this.expression.evaluate(closure["interpreter"])

closure["Print"] = Print
class ReturnValue():
	def __init__(this, value):
		closure["__init__"] = dict().update(closure["__init__"])
		closure["__init__"]["this"] = this,		closure["__init__"]["value"] = value
		this.value = closure["value"]

closure["ReturnValue"] = ReturnValue
class Return():
	def __init__(this, value):
		closure["__init__"] = dict().update(closure["__init__"])
		closure["__init__"]["this"] = this,		closure["__init__"]["value"] = value
		this.type = "Return"
		this.value = closure["value"]

	def str(this):
		closure["str"] = dict().update(closure["str"])
		closure["str"]["this"] = this
		return "return " + this.value.str() + ";" + closure["chr"](10)

	def resolve(this, resolver):
		closure["resolve"] = dict().update(closure["resolve"])
		closure["resolve"]["this"] = this,		closure["resolve"]["resolver"] = resolver
		if this.value != None:
			this.value.resolve(closure["resolver"])

	def execute(this, interpreter):
		closure["execute"] = dict().update(closure["execute"])
		closure["execute"]["this"] = this,		closure["execute"]["interpreter"] = interpreter
		closure["value"] = None
		if this.value != None:
			value = this.value.evaluate(closure["interpreter"])
		return closure["ReturnValue"](closure["value"])

closure["Return"] = Return
class Var():
	def __init__(this, name, initializer):
		closure["__init__"] = dict().update(closure["__init__"])
		closure["__init__"]["this"] = this,		closure["__init__"]["name"] = name,		closure["__init__"]["initializer"] = initializer
		this.type = "Var"
		this.name = closure["name"]
		this.initializer = closure["initializer"]

	def str(this):
		closure["str"] = dict().update(closure["str"])
		closure["str"]["this"] = this
		closure["s"] = "var " + this.name
		if this.initializer != None:
			s = closure["s"] + " = " + this.initializer.str()
		s = closure["s"] + ";" + closure["chr"](10)
		return closure["s"]

	def resolve(this, resolver):
		closure["resolve"] = dict().update(closure["resolve"])
		closure["resolve"]["this"] = this,		closure["resolve"]["resolver"] = resolver
		closure["resolver"].declare(this.name)
		if this.initializer != None:
			this.initializer.resolve(closure["resolver"])
		closure["resolver"].define(this.name)

	def execute(this, interpreter):
		closure["execute"] = dict().update(closure["execute"])
		closure["execute"]["this"] = this,		closure["execute"]["interpreter"] = interpreter
		closure["value"] = None
		if this.initializer != None:
			value = this.initializer.evaluate(closure["interpreter"])
		closure["interpreter"].environment.define(this.name, closure["value"])

closure["Var"] = Var
class While():
	def __init__(this, condition, body):
		closure["__init__"] = dict().update(closure["__init__"])
		closure["__init__"]["this"] = this,		closure["__init__"]["condition"] = condition,		closure["__init__"]["body"] = body
		this.type = "While"
		this.condition = closure["condition"]
		this.body = closure["body"]

	def str(this):
		closure["str"] = dict().update(closure["str"])
		closure["str"]["this"] = this
		return "while (" + this.condition.str() + ") " + this.body.str()

	def resolve(this, resolver):
		closure["resolve"] = dict().update(closure["resolve"])
		closure["resolve"]["this"] = this,		closure["resolve"]["resolver"] = resolver
		this.condition.resolve(closure["resolver"])
		this.body.resolve(closure["resolver"])

	def execute(this, interpreter):
		closure["execute"] = dict().update(closure["execute"])
		closure["execute"]["this"] = this,		closure["execute"]["interpreter"] = interpreter
		while this.condition.evaluate(closure["interpreter"]):
			closure["ret"] = this.body.execute(closure["interpreter"])
			if closure["ret"]:
				return closure["ret"]

closure["While"] = While
class LoxFunction():
	def __init__(this, declaration, closure, isInitializer):
		closure["__init__"] = dict().update(closure["__init__"])
		closure["__init__"]["this"] = this,		closure["__init__"]["declaration"] = declaration,		closure["__init__"]["closure"] = closure,		closure["__init__"]["isInitializer"] = isInitializer
		this.declaration = closure["declaration"]
		this.closure = closure["closure"]
		this.isInitializer = closure["isInitializer"]

	def bind(this, instance):
		closure["bind"] = dict().update(closure["bind"])
		closure["bind"]["this"] = this,		closure["bind"]["instance"] = instance
		closure["environment"] = closure["Environment"](this.closure)
		closure["environment"].define("this", closure["instance"])
		return closure["LoxFunction"](this.declaration, closure["environment"], this.isInitializer)

	def arity(this):
		closure["arity"] = dict().update(closure["arity"])
		closure["arity"]["this"] = this
		return this.declaration.params.length()

	def call(this, interpreter, arguments):
		closure["call"] = dict().update(closure["call"])
		closure["call"]["this"] = this,		closure["call"]["interpreter"] = interpreter,		closure["call"]["arguments"] = arguments
		closure["environment"] = closure["Environment"](this.closure)
		closure["i"] = 0
		def defineArg(name):
			closure["defineArg"] = dict().update(closure["defineArg"])
			closure["defineArg"]["name"] = name
			closure["environment"].define(closure["name"], closure["arguments"].get(closure["i"]))
			i = closure["i"] + 1
		closure["defineArg"] = defineArg
		this.declaration.params.foreach(closure["defineArg"])
		closure["ret"] = closure["interpreter"].executeBlock(this.declaration.body, closure["environment"])
		if this.isInitializer:
			return this.closure.get("this")
		if closure["ret"]:
			return closure["ret"].value
		return None

closure["LoxFunction"] = LoxFunction
class LoxInstance():
	def __init__(this, klass):
		closure["__init__"] = dict().update(closure["__init__"])
		closure["__init__"]["this"] = this,		closure["__init__"]["klass"] = klass
		this.klass = closure["klass"]
		this.fields = closure["Map"]()

	def get(this, name):
		closure["get"] = dict().update(closure["get"])
		closure["get"]["this"] = this,		closure["get"]["name"] = name
		closure["field"] = this.fields.find(closure["name"])
		if closure["field"] != None:
			return closure["field"].value
		closure["method"] = this.klass.findMethod(this, closure["name"])
		if closure["method"] != None:
			return closure["method"]
		closure["runtimeError"]("Undefined property '" + closure["name"] + "'.")

	def set(this, name, value):
		closure["set"] = dict().update(closure["set"])
		closure["set"]["this"] = this,		closure["set"]["name"] = name,		closure["set"]["value"] = value
		this.fields.set(closure["name"], closure["value"])

closure["LoxInstance"] = LoxInstance
class LoxClass():
	def __init__(this, name, superclass, methods):
		closure["__init__"] = dict().update(closure["__init__"])
		closure["__init__"]["this"] = this,		closure["__init__"]["name"] = name,		closure["__init__"]["superclass"] = superclass,		closure["__init__"]["methods"] = methods
		this.name = closure["name"]
		this.superclass = closure["superclass"]
		this.methods = closure["methods"]

	def findMethod(this, instance, name):
		closure["findMethod"] = dict().update(closure["findMethod"])
		closure["findMethod"]["this"] = this,		closure["findMethod"]["instance"] = instance,		closure["findMethod"]["name"] = name
		closure["method"] = this.methods.find(closure["name"])
		if closure["method"] != None:
			return closure["method"].value.bind(closure["instance"])
		if this.superclass != None:
			return this.superclass.findMethod(closure["instance"], closure["name"])
		return None

	def call(this, interpreter, arguments):
		closure["call"] = dict().update(closure["call"])
		closure["call"]["this"] = this,		closure["call"]["interpreter"] = interpreter,		closure["call"]["arguments"] = arguments
		closure["instance"] = closure["LoxInstance"](this)
		closure["initializer"] = this.methods.find("init")
		if closure["initializer"] != None:
			closure["initializer"].value.bind(closure["instance"]).call(closure["interpreter"], closure["arguments"])
		return closure["instance"]

	def arity(this):
		closure["arity"] = dict().update(closure["arity"])
		closure["arity"]["this"] = this
		closure["initializer"] = this.methods.find("init")
		if closure["initializer"] != None:
			return closure["initializer"].value.arity()
		return 0

closure["LoxClass"] = LoxClass
class Builtin0():
	def __init__(this, f):
		closure["__init__"] = dict().update(closure["__init__"])
		closure["__init__"]["this"] = this,		closure["__init__"]["f"] = f
		this.f = closure["f"]

	def arity(this):
		closure["arity"] = dict().update(closure["arity"])
		closure["arity"]["this"] = this
		return 0

	def call(this, interpreter, arguments):
		closure["call"] = dict().update(closure["call"])
		closure["call"]["this"] = this,		closure["call"]["interpreter"] = interpreter,		closure["call"]["arguments"] = arguments
		return this.f()

closure["Builtin0"] = Builtin0
class Builtin1():
	def __init__(this, f):
		closure["__init__"] = dict().update(closure["__init__"])
		closure["__init__"]["this"] = this,		closure["__init__"]["f"] = f
		this.f = closure["f"]

	def arity(this):
		closure["arity"] = dict().update(closure["arity"])
		closure["arity"]["this"] = this
		return 1

	def call(this, interpreter, arguments):
		closure["call"] = dict().update(closure["call"])
		closure["call"]["this"] = this,		closure["call"]["interpreter"] = interpreter,		closure["call"]["arguments"] = arguments
		return this.f(closure["arguments"].get(0))

closure["Builtin1"] = Builtin1
class Parser():
	def __init__(this):
		closure["__init__"] = dict().update(closure["__init__"])
		closure["__init__"]["this"] = this
		this.functionDepth = 0
		this.classDepth = 0
		this.token = None
		this.scanner = closure["Scanner"]()
		this.next()

	def next(this):
		closure["next"] = dict().update(closure["next"])
		closure["next"]["this"] = this
		this.previous = this.token
		this.token = this.scanner.next()
		if this.token.type == closure["INVALID"]:
			this.error(this.token, this.token.value)

	def error(this, token, message):
		closure["error"] = dict().update(closure["error"])
		closure["error"]["this"] = this,		closure["error"]["token"] = token,		closure["error"]["message"] = message
		closure["at"] = None
		if closure["token"].type == closure["INVALID"]:
			at = "Error: "
		else:
			if closure["token"].type == closure["EOF"]:
				at = "Error at end: "
			else:
				if closure["token"].type == closure["IDENTIFIER"]:
					at = "Error at '" + closure["token"].value + "': "
				else:
					if closure["token"].type == closure["NUMBER"]:
						at = "Error at '" + closure["numberStr"](closure["token"].value) + "': "
					else:
						at = "Error at '" + closure["tokenTypeStr"](closure["token"].type) + "': "
		closure["print_error"]("[line " + closure["numberStr"](this.token.line) + "] " + closure["at"] + closure["message"])
		closure["exit"](65)

	def match(this, type):
		closure["match"] = dict().update(closure["match"])
		closure["match"]["this"] = this,		closure["match"]["type"] = type
		if this.token.type == closure["type"]:
			closure["previous"] = this.token
			this.next()
			return closure["previous"]
		return None

	def consume(this, type, message):
		closure["consume"] = dict().update(closure["consume"])
		closure["consume"]["this"] = this,		closure["consume"]["type"] = type,		closure["consume"]["message"] = message
		closure["token"] = this.token
		if this.match(closure["type"]):
			return closure["token"]
		this.error(this.token, closure["message"])

	def parse(this):
		closure["parse"] = dict().update(closure["parse"])
		closure["parse"]["this"] = this
		closure["statements"] = closure["List"]()
		while this.token.type != closure["EOF"]:
			closure["statements"].append(this.declaration())
		return closure["Program"](closure["statements"])

	def expression(this):
		closure["expression"] = dict().update(closure["expression"])
		closure["expression"]["this"] = this
		return this.assignment()

	def declaration(this):
		closure["declaration"] = dict().update(closure["declaration"])
		closure["declaration"]["this"] = this
		if this.match(closure["CLASS"]):
			return this.classDeclaration()
		if this.match(closure["FUN"]):
			return this.function("function")
		if this.match(closure["VAR"]):
			return this.varDeclaration()
		return this.statement()

	def classDeclaration(this):
		closure["classDeclaration"] = dict().update(closure["classDeclaration"])
		closure["classDeclaration"]["this"] = this
		closure["name"] = this.consume(closure["IDENTIFIER"], "Expect class name.")
		closure["superclass"] = None
		if this.match(closure["LESS"]):
			closure["superName"] = this.consume(closure["IDENTIFIER"], "Expect superclass name.")
			superclass = closure["Variable"](closure["superName"].value)
		this.classDepth = this.classDepth + 1
		this.hasSuperClass = closure["superclass"] != None
		this.consume(closure["LEFT_BRACE"], "Expect '{' before class body.")
		closure["methods"] = closure["List"]()
		while this.token.type != closure["EOF"] and this.token.type != closure["RIGHT_BRACE"]:
			closure["methods"].append(this.function("method"))
		this.consume(closure["RIGHT_BRACE"], "Expect '}' after class body.")
		this.classDepth = this.classDepth - 1
		this.hasSuperClass = False
		return closure["Class"](closure["name"].value, closure["superclass"], closure["methods"])

	def statement(this):
		closure["statement"] = dict().update(closure["statement"])
		closure["statement"]["this"] = this
		if this.match(closure["FOR"]):
			return this.forStatement()
		if this.match(closure["IF"]):
			return this.ifStatement()
		if this.match(closure["PRINT"]):
			return this.printStatement()
		if this.match(closure["RETURN"]):
			return this.returnStatement()
		if this.match(closure["WHILE"]):
			return this.whileStatement()
		if this.match(closure["LEFT_BRACE"]):
			return closure["Block"](this.block())
		return this.expressionStatement()

	def forStatement(this):
		closure["forStatement"] = dict().update(closure["forStatement"])
		closure["forStatement"]["this"] = this
		this.consume(closure["LEFT_PAREN"], "Expect '(' after 'for'.")
		closure["initializer"] = None
		if this.match(closure["SEMICOLON"]):
			pass
		else:
			if this.match(closure["VAR"]):
				initializer = this.varDeclaration()
			else:
				initializer = this.expressionStatement()
		closure["condition"] = None
		if this.token.type != closure["SEMICOLON"]:
			condition = this.expression()
		this.consume(closure["SEMICOLON"], "Expect ';' after loop condition.")
		closure["increment"] = None
		if this.token.type != closure["RIGHT_PAREN"]:
			increment = closure["Expression"](this.expression())
		this.consume(closure["RIGHT_PAREN"], "Expect ')' after for clauses.")
		closure["body"] = this.statement()
		if closure["increment"] != None:
			closure["statements"] = closure["List"]()
			closure["statements"].append(closure["body"])
			closure["statements"].append(closure["increment"])
			body = closure["Block"](closure["statements"])
		if closure["condition"] == None:
			condition = closure["Literal"]("boolean", True)
		body = closure["While"](closure["condition"], closure["body"])
		if closure["initializer"] != None:
			closure["statements"] = closure["List"]()
			closure["statements"].append(closure["initializer"])
			closure["statements"].append(closure["body"])
			body = closure["Block"](closure["statements"])
		return closure["body"]

	def ifStatement(this):
		closure["ifStatement"] = dict().update(closure["ifStatement"])
		closure["ifStatement"]["this"] = this
		this.consume(closure["LEFT_PAREN"], "Expect '(' after 'if'.")
		closure["condition"] = this.expression()
		this.consume(closure["RIGHT_PAREN"], "Expect ')' after if condition.")
		closure["thenBranch"] = this.statement()
		closure["elseBranch"] = None
		if this.match(closure["ELSE"]):
			elseBranch = this.statement()
		return closure["If"](closure["condition"], closure["thenBranch"], closure["elseBranch"])

	def printStatement(this):
		closure["printStatement"] = dict().update(closure["printStatement"])
		closure["printStatement"]["this"] = this
		closure["value"] = this.expression()
		this.consume(closure["SEMICOLON"], "Expect ';' after value.")
		return closure["Print"](closure["value"])

	def returnStatement(this):
		closure["returnStatement"] = dict().update(closure["returnStatement"])
		closure["returnStatement"]["this"] = this
		if this.functionDepth <= 0:
			this.error(this.previous, "Cannot return from top-level code.")
		closure["value"] = None
		if this.token.type != closure["SEMICOLON"]:
			if this.inInitializer:
				this.error(this.previous, "Cannot return a value from an initializer.")
			value = this.expression()
		this.consume(closure["SEMICOLON"], "Expect ';' after return value.")
		return closure["Return"](closure["value"])

	def varDeclaration(this):
		closure["varDeclaration"] = dict().update(closure["varDeclaration"])
		closure["varDeclaration"]["this"] = this
		closure["name"] = this.consume(closure["IDENTIFIER"], "Expect variable name.")
		closure["initializer"] = None
		if this.match(closure["EQUAL"]):
			initializer = this.expression()
		this.consume(closure["SEMICOLON"], "Expect ';' after variable declaration.")
		return closure["Var"](closure["name"].value, closure["initializer"])

	def whileStatement(this):
		closure["whileStatement"] = dict().update(closure["whileStatement"])
		closure["whileStatement"]["this"] = this
		this.consume(closure["LEFT_PAREN"], "Expect '(' after 'while'.")
		closure["condition"] = this.expression()
		this.consume(closure["RIGHT_PAREN"], "Expect ')' after condition.")
		closure["body"] = this.statement()
		return closure["While"](closure["condition"], closure["body"])

	def expressionStatement(this):
		closure["expressionStatement"] = dict().update(closure["expressionStatement"])
		closure["expressionStatement"]["this"] = this
		closure["expr"] = this.expression()
		this.consume(closure["SEMICOLON"], "Expect ';' after expression.")
		return closure["Expression"](closure["expr"])

	def function(this, kind):
		closure["function"] = dict().update(closure["function"])
		closure["function"]["this"] = this,		closure["function"]["kind"] = kind
		closure["name"] = this.consume(closure["IDENTIFIER"], "Expect " + closure["kind"] + " name.")
		this.consume(closure["LEFT_PAREN"], "Expect '(' after " + closure["kind"] + " name.")
		closure["parameters"] = closure["List"]()
		closure["n"] = 0
		while this.token.type != closure["RIGHT_PAREN"]:
			if closure["n"] > 0:
				this.consume(closure["COMMA"], "Expect ')' after parameters.")
			if closure["n"] >= 8:
				this.error(this.token, "Cannot have more than 8 parameters.")
			closure["paramName"] = this.consume(closure["IDENTIFIER"], "Expect parameter name.")
			closure["parameters"].append(closure["paramName"].value)
			n = closure["n"] + 1
		this.consume(closure["RIGHT_PAREN"], "Expect ')' after parameters.")
		this.consume(closure["LEFT_BRACE"], "Expect '{' before " + closure["kind"] + " body.")
		this.functionDepth = this.functionDepth + 1
		this.inInitializer = closure["kind"] == "method" and closure["name"].value == "init"
		closure["body"] = this.block()
		this.functionDepth = this.functionDepth - 1
		this.inInitializer = False
		return closure["Function"](closure["name"].value, closure["parameters"], closure["body"])

	def block(this):
		closure["block"] = dict().update(closure["block"])
		closure["block"]["this"] = this
		closure["statements"] = closure["List"]()
		while this.token.type != closure["EOF"] and this.token.type != closure["RIGHT_BRACE"]:
			closure["statements"].append(this.declaration())
		this.consume(closure["RIGHT_BRACE"], "Expect '}' after block.")
		return closure["statements"]

	def assignment(this):
		closure["assignment"] = dict().update(closure["assignment"])
		closure["assignment"]["this"] = this
		closure["expr"] = this.or_()
		if this.match(closure["EQUAL"]):
			closure["equals"] = this.previous
			closure["value"] = this.assignment()
			if closure["expr"].type == "Variable":
				return closure["Assign"](closure["expr"].name, closure["value"])
			if closure["expr"].type == "Get":
				return closure["Set"](closure["expr"].object, closure["expr"].name, closure["value"])
			this.error(closure["equals"], "Invalid assignment target.")
		return closure["expr"]

	def or_(this):
		closure["or_"] = dict().update(closure["or_"])
		closure["or_"]["this"] = this
		closure["expr"] = this.and_()
		while this.match(closure["OR"]):
			closure["right"] = this.and_()
			expr = closure["Logical"](closure["expr"], closure["OR"], closure["right"])
		return closure["expr"]

	def and_(this):
		closure["and_"] = dict().update(closure["and_"])
		closure["and_"]["this"] = this
		closure["expr"] = this.equality()
		while this.match(closure["AND"]):
			closure["right"] = this.equality()
			expr = closure["Logical"](closure["expr"], closure["AND"], closure["right"])
		return closure["expr"]

	def equality(this):
		closure["equality"] = dict().update(closure["equality"])
		closure["equality"]["this"] = this
		closure["expr"] = this.comparison()
		while this.token.type == closure["BANG_EQUAL"] or this.token.type == closure["EQUAL_EQUAL"]:
			closure["operator"] = this.token.type
			this.next()
			closure["right"] = this.comparison()
			expr = closure["Binary"](closure["expr"], closure["operator"], closure["right"])
		return closure["expr"]

	def comparison(this):
		closure["comparison"] = dict().update(closure["comparison"])
		closure["comparison"]["this"] = this
		closure["expr"] = this.addition()
		while this.token.type == closure["GREATER"] or this.token.type == closure["GREATER_EQUAL"] or this.token.type == closure["LESS"] or this.token.type == closure["LESS_EQUAL"]:
			closure["operator"] = this.token.type
			this.next()
			closure["right"] = this.addition()
			expr = closure["Binary"](closure["expr"], closure["operator"], closure["right"])
		return closure["expr"]

	def addition(this):
		closure["addition"] = dict().update(closure["addition"])
		closure["addition"]["this"] = this
		closure["expr"] = this.multiplication()
		while this.token.type == closure["MINUS"] or this.token.type == closure["PLUS"]:
			closure["operator"] = this.token.type
			this.next()
			closure["right"] = this.multiplication()
			expr = closure["Binary"](closure["expr"], closure["operator"], closure["right"])
		return closure["expr"]

	def multiplication(this):
		closure["multiplication"] = dict().update(closure["multiplication"])
		closure["multiplication"]["this"] = this
		closure["expr"] = this.unary()
		while this.token.type == closure["SLASH"] or this.token.type == closure["STAR"]:
			closure["operator"] = this.token.type
			this.next()
			closure["right"] = this.unary()
			expr = closure["Binary"](closure["expr"], closure["operator"], closure["right"])
		return closure["expr"]

	def unary(this):
		closure["unary"] = dict().update(closure["unary"])
		closure["unary"]["this"] = this
		if this.token.type == closure["BANG"] or this.token.type == closure["MINUS"]:
			closure["operator"] = this.token.type
			this.next()
			closure["right"] = this.unary()
			return closure["Unary"](closure["operator"], closure["right"])
		return this.call()

	def call(this):
		closure["call"] = dict().update(closure["call"])
		closure["call"]["this"] = this
		closure["expr"] = this.primary()
		closure["loop"] = True
		while closure["loop"]:
			if this.match(closure["LEFT_PAREN"]):
				closure["arguments"] = closure["List"]()
				closure["n"] = 0
				while this.token.type != closure["RIGHT_PAREN"]:
					if closure["n"] > 0:
						this.consume(closure["COMMA"], "Expect ')' after arguments.")
					if closure["n"] >= 8:
						this.error(this.token, "Cannot have more than 8 arguments.")
					closure["arguments"].append(this.expression())
					n = closure["n"] + 1
				this.consume(closure["RIGHT_PAREN"], "Expect ')' after arguments.")
				expr = closure["Call"](closure["expr"], closure["arguments"])
			else:
				if this.match(closure["DOT"]):
					closure["name"] = this.consume(closure["IDENTIFIER"], "Expect property name after '.'.")
					expr = closure["Get"](closure["expr"], closure["name"].value)
				else:
					loop = False
		return closure["expr"]

	def primary(this):
		closure["primary"] = dict().update(closure["primary"])
		closure["primary"]["this"] = this
		if this.match(closure["FALSE"]):
			return closure["Literal"]("boolean", False)
		if this.match(closure["TRUE"]):
			return closure["Literal"]("boolean", True)
		if this.match(closure["NIL"]):
			return closure["Literal"]("nil", None)
		closure["number"] = this.match(closure["NUMBER"])
		if closure["number"]:
			return closure["Literal"]("number", closure["number"].value)
		closure["string"] = this.match(closure["STRING"])
		if closure["string"]:
			return closure["Literal"]("string", closure["string"].value)
		if this.match(closure["SUPER"]):
			if this.classDepth <= 0:
				this.error(this.previous, "Cannot use 'super' outside of a class.")
			if not this.hasSuperClass:
				this.error(this.previous, "Cannot use 'super' in a class with no superclass.")
			this.consume(closure["DOT"], "Expect '.' after 'super'.")
			closure["method"] = this.consume(closure["IDENTIFIER"], "Expect superclass method name.")
			return closure["Super"](closure["method"].value)
		if this.match(closure["THIS"]):
			if this.classDepth <= 0:
				this.error(this.previous, "Cannot use 'this' outside of a class.")
			return closure["This"]()
		closure["identifier"] = this.match(closure["IDENTIFIER"])
		if closure["identifier"]:
			return closure["Variable"](closure["identifier"].value)
		if this.match(closure["LEFT_PAREN"]):
			closure["expr"] = this.expression()
			this.consume(closure["RIGHT_PAREN"], "Expect ')' after expression.")
			return closure["Grouping"](closure["expr"])
		this.error(this.token, "Expect expression.")

closure["Parser"] = Parser
class Resolver():
	def __init__(this, program, interpreter):
		closure["__init__"] = dict().update(closure["__init__"])
		closure["__init__"]["this"] = this,		closure["__init__"]["program"] = program,		closure["__init__"]["interpreter"] = interpreter
		this.program = closure["program"]
		this.interpreter = closure["interpreter"]
		this.scopes = closure["List"]()

	def error(this, message):
		closure["error"] = dict().update(closure["error"])
		closure["error"]["this"] = this,		closure["error"]["message"] = message
		closure["print_error"]("[line 1] " + closure["message"])
		closure["exit"](65)

	def resolve(this):
		closure["resolve"] = dict().update(closure["resolve"])
		closure["resolve"]["this"] = this
		this.program.resolve(this)

	def resolveFunction(this, function):
		closure["resolveFunction"] = dict().update(closure["resolveFunction"])
		closure["resolveFunction"]["this"] = this,		closure["resolveFunction"]["function"] = function
		this.beginScope()
		def declareParam(param):
			closure["declareParam"] = dict().update(closure["declareParam"])
			closure["declareParam"]["param"] = param
			this.declare(closure["param"])
			this.define(closure["param"])
		closure["declareParam"] = declareParam
		closure["function"].params.foreach(closure["declareParam"])
		def resolveStatement(statement):
			closure["resolveStatement"] = dict().update(closure["resolveStatement"])
			closure["resolveStatement"]["statement"] = statement
			closure["statement"].resolve(closure["resolver"])
		closure["resolveStatement"] = resolveStatement
		closure["function"].body.foreach(closure["resolveStatement"])
		this.endScope()

	def beginScope(this):
		closure["beginScope"] = dict().update(closure["beginScope"])
		closure["beginScope"]["this"] = this
		this.scopes.append(closure["Map"]())

	def endScope(this):
		closure["endScope"] = dict().update(closure["endScope"])
		closure["endScope"]["this"] = this
		this.scopes.pop()

	def declare(this, name):
		closure["declare"] = dict().update(closure["declare"])
		closure["declare"]["this"] = this,		closure["declare"]["name"] = name
		if this.scopes.length() == 0:
			return None
		closure["scope"] = this.scopes.last()
		if closure["scope"].find(closure["name"]):
			this.error("Error at '" + closure["name"] + "': Variable with this name already declared in this scope.")
		closure["scope"].set(closure["name"], False)

	def define(this, name):
		closure["define"] = dict().update(closure["define"])
		closure["define"]["this"] = this,		closure["define"]["name"] = name
		if this.scopes.length() == 0:
			return None
		this.scopes.last().set(closure["name"], True)

	def resolveVar(this, expr, name):
		closure["resolveVar"] = dict().update(closure["resolveVar"])
		closure["resolveVar"]["this"] = this,		closure["resolveVar"]["expr"] = expr,		closure["resolveVar"]["name"] = name
		closure["i"] = this.scopes.length() - 1
		while closure["i"] >= 0:
			if this.scopes.get(closure["i"]).find(closure["name"]):
				this.interpreter.resolve(closure["expr"], this.scopes.length() - 1 - closure["i"])
				return None
			i = closure["i"] - 1

closure["Resolver"] = Resolver
class Interpreter():
	def __init__(this, program):
		closure["__init__"] = dict().update(closure["__init__"])
		closure["__init__"]["this"] = this,		closure["__init__"]["program"] = program
		this.program = closure["program"]
		this.globals = closure["Environment"](None)
		this.environment = this.globals
		this.locals = closure["Map"]()
		this.globals.define("clock", closure["Builtin0"](closure["clock"]))
		this.globals.define("getc", closure["Builtin0"](closure["getc"]))
		this.globals.define("chr", closure["Builtin1"](closure["chr"]))
		this.globals.define("exit", closure["Builtin1"](closure["exit"]))
		this.globals.define("print_error", closure["Builtin1"](closure["print_error"]))

	def interpret(this):
		closure["interpret"] = dict().update(closure["interpret"])
		closure["interpret"]["this"] = this
		this.program.execute(this)

	def executeBlock(this, statements, environment):
		closure["executeBlock"] = dict().update(closure["executeBlock"])
		closure["executeBlock"]["this"] = this,		closure["executeBlock"]["statements"] = statements,		closure["executeBlock"]["environment"] = environment
		closure["previous"] = this.environment
		this.environment = closure["environment"]
		closure["ret"] = None
		def executeStatement(statement):
			closure["executeStatement"] = dict().update(closure["executeStatement"])
			closure["executeStatement"]["statement"] = statement
			ret = closure["statement"].execute(this)
			if closure["ret"]:
				return True
			return False
		closure["executeStatement"] = executeStatement
		closure["statements"].foreach(closure["executeStatement"])
		this.environment = closure["previous"]
		return closure["ret"]

	def resolve(this, expr, depth):
		closure["resolve"] = dict().update(closure["resolve"])
		closure["resolve"]["this"] = this,		closure["resolve"]["expr"] = expr,		closure["resolve"]["depth"] = depth
		this.locals.set(closure["expr"], closure["depth"])

	def lookupVariable(this, name, expr):
		closure["lookupVariable"] = dict().update(closure["lookupVariable"])
		closure["lookupVariable"]["this"] = this,		closure["lookupVariable"]["name"] = name,		closure["lookupVariable"]["expr"] = expr
		closure["distance"] = this.locals.get(closure["expr"])
		if closure["distance"] != None:
			return this.environment.getAt(closure["distance"], closure["name"])
		else:
			return this.globals.get(closure["name"])

closure["Interpreter"] = Interpreter
def runtimeError(message):
	closure["runtimeError"] = dict().update(closure["runtimeError"])
	closure["runtimeError"]["message"] = message
	closure["print_error"](closure["message"])
	closure["print_error"]("[line 1]")
	closure["exit"](70)
closure["runtimeError"] = runtimeError
closure["parser"] = closure["Parser"]()
closure["program"] = closure["parser"].parse()
print closure["program"].str()
print "-----"
closure["interpreter"] = closure["Interpreter"](closure["program"])
closure["resolver"] = closure["Resolver"](closure["program"], closure["interpreter"])
closure["resolver"].resolve()
closure["interpreter"].interpret()
