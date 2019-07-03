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

class LoxFunction():
  def __init__(self, func, closure):
    self.func = func
    self.closure = closure
  def __call__(self, *args):
    global closure
    oldEnv = closure
    retval = self.func(LoxEnvironment(self.closure), *args)
    closure = oldEnv
    return retval


closure = LoxEnvironment()


