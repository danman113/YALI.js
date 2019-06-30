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
def stringBuilder(init):
	closure["closure"] = dict().update(closure["closure"])
	closure["closure"]["init"] = init
	closure["closure"]["string"] = closure["closure"]["init"]
	def append(str):
		closure["closure"] = dict().update(closure["closure"])
		closure["closure"]["str"] = str
		string = closure["closure"]["string"] + closure["closure"]["str"]
		return closure["closure"]["string"]
	closure["closure"]["append"] = append
	return closure["closure"]["append"]
closure["closure"]["stringBuilder"] = stringBuilder
closure["closure"]["strbuilder"] = closure["closure"]["stringBuilder"]("hello")
print closure["closure"]["strbuilder"](" world")
