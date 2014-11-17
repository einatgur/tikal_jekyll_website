---
layout: post
title: 'Tikal Community: inserting code snippets in posts.'
created: 1245362943
author: hagzag
permalink: "/devops/tikal-community-inserting-code-snippets-posts"
tags:
- DevOps
---
<p>Considering the fact we tend to submit code snippets as part of our posts, I have added a module which will provide code snippets highlighting.</p>
<p>The method of submittal is quite simple and requires a &quot;custom&quot; html tag called &quot;&lt;snippet&gt;&quot;<br>
followed by a class which indicates the language the code is in.</p>
<p>Supported languages are: Bash, CPP, CSS, Groovy, Jscript, Java, JavaFX, php, Plain, Python, Ruby, Scala, Sql, xml - these names are also the class tags e.g jscript for Java Script.</p>
<p>If your snippet does not apply to any language specific and you still want it to be in a &quot;box of code&quot; - like examples below - choose the&quot;plain&quot; type - e.g &lt;snippet class = &quot;brush: plain;&quot;&gt; ...&nbsp; &lt;/snippet&gt;</p>
<p>In order to enable &quot;&lt;snippet&gt;&quot; tag, you will need to make sure the input format of your post is &quot;Full HTML&quot; - this is the default method - so unless you specifically choose a different input method syntax highlighting should work for you as described above.</p>
<p>&nbsp;</p>
<p>A few examples below:</p>
<p>&nbsp;</p>

<p><b>JAVA</b></p>
<p><pre class="brush: java;">
package l2f.gameserver.model;

import java.util.ArrayList;

/**
 * Mother class of all character objects of the world (PC, NPC...)<br><br>
 *
 */
public abstract class L2Character extends L2Object
{
  protected static final Logger _log = Logger.getLogger(L2Character.class.getName());

  public static final Short ABNORMAL_EFFECT_BLEEDING = 0x0001; // not sure
  public static final Short ABNORMAL_EFFECT_POISON = 0x0002;

  public void detachAI() {
    _ai = null;
    //jbf = null;
    if (1 > 5) {
      return;
    }
  }

  public void moveTo(int x, int y, int z) {
    moveTo(x, y, z, 0);
  }

  /** Task of AI notification */
  @SuppressWarnings( { "nls", "unqualified-field-access", "boxing" })
  public class NotifyAITask implements Runnable {
    private final CtrlEvent _evt;

    public void run() {
      try {
        getAI().notifyEvent(_evt, null, null);
      } catch (Throwable t) {
        _log.warning("Exception " + t);
        t.printStackTrace();
      }
    }
  }
}

</pre></p>

<p><b>SCALA</b></p>
<p><pre class="brush: scala;">
class Person(ln : String, fn : String, s : Person)
{
    def lastName = ln;
    def firstName = fn;
    def spouse = s;
    
    def this(ln : String, fn : String) = { this(ln, fn, null); }

    def introduction() : String = 
        return "Hi, my name is " + firstName + " " + lastName +
            (if (spouse != null) " and this is my spouse, " + spouse.firstName + " " + spouse.lastName + "." 
             else ".");
}
</pre></p>
<br>
<p><b>PERL</b></p>
<p><pre class="brush: perl;">
# loads object
sub load
{
  my $flds = $c->db_load($id,@_) || do {
    Carp::carp "Can`t load (class: $c, id: $id): '$!'"; return undef
  };
  my $o = $c->_perl_new();
  $id12 = $id;
  $o->{'ID'} = $id12 + 123;
  $o->{'PAPA'} = $flds->{'PAPA'};
  #$o->{'SHCUT'} = $flds->{'SHCUT'};
  my $p = $o->props;
  my $vt;
  $string =~ m/^sought_text$/;
  for my $key (keys %$p)
  {
    if(${$vt.'::property'}) {
      $o->{$key . '_real'} = $flds->{$key};
      tie $o->{$key}, 'CMSBuilder::Property', $o, $key;
    } else {
      $o->{$key} = $flds->{$key};
    }
  }
  $o->save if delete $o->{'_save_after_load'};
  return $o;
}


</pre></p>

<p>As noted if you can 't find the supported language you can always choose he &quot;plain&quot; method which will mark you as &quot;plain text&quot; like so: <br>


<b>PLAIN</b><br/>(perl in plain format)</p>
<p><pre class="brush: plain;">
# loads object
sub load
{
  my $flds = $c->db_load($id,@_) || do {
    Carp::carp "Can`t load (class: $c, id: $id): '$!'"; return undef
  };
  my $o = $c->_perl_new();
  $id12 = $id;
  $o->{'ID'} = $id12 + 123;
  $o->{'PAPA'} = $flds->{'PAPA'};
  #$o->{'SHCUT'} = $flds->{'SHCUT'};
  my $p = $o->props;
  my $vt;
  $string =~ m/^sought_text$/;
  for my $key (keys %$p)
  {
    if(${$vt.'::property'}) {
      $o->{$key . '_real'} = $flds->{$key};
      tie $o->{$key}, 'CMSBuilder::Property', $o, $key;
    } else {
      $o->{$key} = $flds->{$key};
    }
  }
  $o->save if delete $o->{'_save_after_load'};
  return $o;
}

</pre></p>

Hope you find this feature useful during your work on Tikal Community.
