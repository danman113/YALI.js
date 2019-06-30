class LoxEnvironment:
	def __init__(self, enclosing = None):
		self.map = dict()
		self.enclosing = enclosing
	def pop(self):
		# print self, self.enclosing
		return self.enclosing
	def get(self, valname):
		if valname in self.map:
			return self.map[valname]
		if self.enclosing is not None:
			return self.enclosing.get(valname)
		raise Exception('Undefined variable ' + valname)

	def declare(self, valname, value = None):
		if valname in self.map:
			raise Exception('Undefined variable ' + valname)
		self.map[valname] = value
		return self.map[valname]

	def assign(self, valname, value):
		if valname not in self.map:
			if self.enclosing is not None:
				return self.enclosing.assign(valname, value)
			raise Exception('Undefined variable ' + valname)
		self.map[valname] = value
		return self.map[valname]

closure = LoxEnvironment()

# End of polyfill


# var a = "!"
closure.declare('a', '!')
def stringBuilder(init):
	# Func decl
	global closure
	closure = LoxEnvironment(closure)
	# Arg Decl
	closure.declare('init', init)

	# var string = init
	closure.declare('string', closure.get('init'))
	def append(str):
		# Func decl
		global closure
		closure = LoxEnvironment(closure)
		# Arg Decl
		closure.declare('str', str)
		# string = string + str + a
		closure.assign('string', closure.get('string') + closure.get('str') + closure.get('a'))
		# return string
		retvalue = closure.get('string')
		closure = closure.pop()
		return retvalue
	# Function Decl
	closure.declare('append', append)
	# return append
	retvalue = closure.get('append')
	closure = closure.pop()
	return retvalue
# Function decl
closure.declare('stringBuilder', stringBuilder)

# var strbuilder = stringBuilder("hello")
closure.declare('strbuilder', closure.get('stringBuilder')("hello"))
# print strbuilder(" world")
print closure.get('strbuilder')(" world")