class Doughnut():
	def __init__(this, name):
		this.name = name
	def cook(this):
		name = ""
		if this.name:
			name = this.name + " "
		print "You fry the " + name + "Doughnut until golden brown."
class BostonCream(Doughnut):
	def __init__(this):
		Doughnut.__init__(this, "Boston Cream")
Doughnut("Cruller").cook()
BostonCream().cook()
def hello():
	print "Would you like some breakfast?"
print BostonCream
print Doughnut
print BostonCream()
print hello
